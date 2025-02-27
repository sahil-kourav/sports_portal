import Tournament from "../models/tournamentModel.js";

const createTournament = async (req, res) => {
    try {
        const { 
            title, 
            subTitle,
            description, 
            organizer, 
            location, 
            date, 
            registrationDeadline, 
            prizePool, 
            entryFee, 
            tournamentType, 
            tournamentThumbnail, 
            contactInfo, 
            maxTeams, 
            teamSize, 
            matchFormat, 
            matchSchedule,
            rules 
        } = req.body;

        // ✅ Required fields validation
        if (!title || !organizer || !tournamentType || !location || !date || !registrationDeadline || !prizePool || !entryFee || !contactInfo?.email || !contactInfo?.phone) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields. Please provide all necessary details."
            });
        }

        // ✅ Create Tournament
        const tournament = await Tournament.create({
            title,
            subTitle,
            description,
            organizer,
            createdBy: req.id, 
            location,
            date,
            registrationDeadline,
            prizePool,
            entryFee,
            tournamentType,
            tournamentThumbnail,
            contactInfo,
            maxTeams,
            teamSize,
            matchFormat,
            matchSchedule,
            rules
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
            error: error.message,
        });
    }
};

module.exports = { createTournament };