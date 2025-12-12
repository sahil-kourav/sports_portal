// const jwt = require("jsonwebtoken");

// const generateToken = (res, user, message) => {
//   const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return res
//     .status(200)
//     .cookie("token", token, {
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     })
//     .json({
//       success: true,
//       message,
//       user,
//     });
// };

// module.exports = { generateToken }; 



const jwt = require("jsonwebtoken");

const generateToken = (res, user, message) => {
    const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY, 
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    

    res.status(200).json({
        success: true,
        message,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
    });
};
module.exports = { generateToken }; 