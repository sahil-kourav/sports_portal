const express = require("express");
const router = express.Router();
const Tournament = require("../models/tournament.model");

const { deleteMediaFromCloudinary, uploadMedia } = require("../utils/cloudinary");

const createTournament = async (req, res) => {
    try {
        const { tournamentTitle, category } = req.body;
        if (!tournamentTitle || !category) {
            return res.status(400).json({
                success: false,
                message: " All filds are required. Please provide all necessary details."
            });
        }
        const tournament = await Tournament.create({
            tournamentTitle,
            category,
            creator: req.id,
        });

        return res.status(201).json({
            success: true,
            message: "Tournament created successfully!",
            tournament,
        });

    } catch (error) {
        console.error("Error creating tournament:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create tournament. Please try again later.",
        });
    }
};

const searchTournament = async (req, res) => {
    try {
        const { query = "", categories = [], sortByPrice = "" } = req.query;
        console.log(categories);

        // create search query
        const searchCriteria = {
            isPublished: true,
            $or: [
                { tournamentTitle: { $regex: query, $options: "i" } },
                { subTitle: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ]
        }

        // if categories selected
        if (categories.length > 0) {
            searchCriteria.category = { $in: categories };
        }

        // define sorting order
        const sortOptions = {};
        if (sortByPrice === "low") {
            sortOptions.tournamentPrice = 1;//sort by price in ascending
        } else if (sortByPrice === "high") {
            sortOptions.tournamentPrice = -1; // descending
        }

        let tournaments = await Tournament.find(searchCriteria).populate({ path: "creator", select: "name photoUrl" }).sort(sortOptions);

        return res.status(200).json({
            success: true,
            tournaments: tournaments || []
        });

    } catch (error) {
        console.log(error);
    }
}

const getPublishedTournament = async (_, res) => {
    try {
        const tournaments = await Tournament.find({ isPublished: true }).populate({ path: "creator", select: "name photoUrl" });
        if (!tournaments) {
            return res.status(404).json({
                message: "tournament not found"
            })
        }
        return res.status(200).json({
            tournaments,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get published tournaments"
        })
    }
}

const getCreatorTournaments = async (req, res) => {
    try {
        const userId = req.id;
        const tournaments = await Tournament.find({ creator: userId });
        if (!tournaments) {
            return res.status(404).json({
                tournaments: [],
                message: "tournament not found"
            })
        };
        return res.status(200).json({
            tournaments,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create tournament"
        })
    }
}
const editTournament = async (req, res) => {
    try {
        const tournamentId = req.params.tournamentId;
        const { tournamentTitle, subTitle, description, category, location, registrationDeadline, registrationFee, status, prizePoolFirst, prizePoolSecond, prizePoolThird, maxTeams, contactInfo } = req.body;
        const thumbnail = req.file;

        let tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                message: "tournament not found!"
            })
        }
        let tournamentThumbnail;
        if (thumbnail) {
            if (tournament.tournamentThumbnail) {
                const publicId = tournament.tournamentThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image
            }
            // upload a thumbnail on clourdinary
            tournamentThumbnail = await uploadMedia(thumbnail.path);
        }


        const updateData = { tournamentTitle, subTitle, description, category, location, registrationDeadline, registrationFee, status, prizePoolFirst, prizePoolSecond, prizePoolThird, maxTeams, contactInfo, tournamentThumbnail: tournamentThumbnail?.secure_url };

        tournament = await Tournament.findByIdAndUpdate(tournamentId, updateData, { new: true });

        return res.status(200).json({
            tournament,
            message: "tournament updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update tournament"
        })
    }
}



// const editTournament = async (req, res) => {
//     try {
//         const tournamentId = req.params.tournamentId;
//         const { tournamentTitle, subTitle, description, category, location, registrationDeadline, registrationFee, status, prizePoolFirst, prizePoolSecond, prizePoolThird, maxTeams, contactInfo } = req.body;
//         const thumbnail = req.file;

//         let tournament = await Tournament.findById(tournamentId);
//         if (!tournament) {
//             return res.status(404).json({
//                 message: "Tournament not found!"
//             });
//         }

//         let tournamentThumbnail;
//         if (thumbnail) {
//             if (tournament.tournamentThumbnail) {
//                 const publicId = await getPublicIdFromCloudinary(tournament.tournamentThumbnail);
//                 if (publicId) {
//                     await deleteMediaFromCloudinary(publicId); // Delete old image
//                 }
//             }
//             // Upload new thumbnail to Cloudinary
//             tournamentThumbnail = await uploadMedia(thumbnail.path);
//         }

//         const updateData = {
//             tournamentTitle,
//             subTitle,
//             description,
//             category,
//             location,
//             registrationDeadline,
//             registrationFee,
//             status,
//             prizePoolFirst,
//             prizePoolSecond,
//             prizePoolThird,
//             maxTeams,
//             contactInfo,
//             tournamentThumbnail: tournamentThumbnail?.secure_url
//         };

//         tournament = await Tournament.findByIdAndUpdate(tournamentId, updateData, { new: true });

//         return res.status(200).json({
//             tournament,
//             message: "Tournament updated successfully."
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Failed to update tournament"
//         });
//     }
// };



const deleteTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        // Find the tournament
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found!"
            });
        }

        // Delete thumbnail from Cloudinary (if exists)
        if (tournament.tournamentThumbnail) {
            const publicId = tournament.tournamentThumbnail.split("/").pop().split(".")[0];
            await deleteMediaFromCloudinary(publicId);
        }

        // Delete the tournament from the database
        await Tournament.findByIdAndDelete(tournamentId);

        return res.status(200).json({
            success: true,
            message: "Tournament deleted successfully!"
        });
    } catch (error) {
        console.error("Error deleting tournament:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete tournament. Please try again later."
        });
    }
};



// const deleteTournament = async (req, res) => {
//     try {
//         const { tournamentId } = req.params;

//         // Find the tournament
//         const tournament = await Tournament.findById(tournamentId);
//         if (!tournament) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Tournament not found!"
//             });
//         }

//         // Delete thumbnail from Cloudinary (Safe Way)
//         if (tournament.tournamentThumbnail) {
//             const publicId = await getPublicIdFromCloudinary(tournament.tournamentThumbnail);
//             if (publicId) {
//                 await deleteMediaFromCloudinary(publicId);
//             }
//         }

//         // Delete the tournament from the database
//         await Tournament.findByIdAndDelete(tournamentId);

//         return res.status(200).json({
//             success: true,
//             message: "Tournament deleted successfully!"
//         });
//     } catch (error) {
//         console.error("Error deleting tournament:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to delete tournament. Please try again later."
//         });
//     }
// };


const getTournamentById = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        const tournament = await Tournament.findById(tournamentId);

        if (!tournament) {
            return res.status(404).json({
                message: "tournament not found!"
            })
        }
        return res.status(200).json({
            tournament
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get tournament by id"
        })
    }
}

const togglePublishTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const { publish } = req.query; // true, false
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                message: "tournament not found!"
            });
        }
        // publish status based on the query paramter
        tournament.isPublished = publish === "true";
        await tournament.save();

        const statusMessage = tournament.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message: `tournament is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update status"
        })
    }
}

const enrollInTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const userId = req.user.id; // Ye authMiddleware se milega

        // Tournament find karo
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });

        // Check karo ki user pehle se enrolled hai ya nahi
        if (tournament.enrolledUsers.includes(userId)) {
            return res.status(400).json({ message: "You are already enrolled in this tournament" });
        }

        // Tournament me user ko enroll karo
        tournament.enrolledUsers.push(userId);
        await tournament.save();

        // User schema me bhi enroll update karo
        await User.findByIdAndUpdate(userId, { $push: { enrolledTournaments: tournamentId } });

        res.status(200).json({ message: "Successfully enrolled in tournament" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = { createTournament, searchTournament, getPublishedTournament, getCreatorTournaments, editTournament, deleteTournament, getTournamentById, togglePublishTournament, enrollInTournament };