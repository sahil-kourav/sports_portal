const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
   try {
      const token = req.cookies.token;
      if(!token){
        return res.status(401).json({
            message: "User not authenticated",
            success: false
        })
      }
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
         if (!decode || !decode.userId) {
         return res.status(401).json({
            message:"Invalid token",
            success: false
         })
      }

      req.id = decode.userId;
      req.user = { _id: decode.userId || decode.id };
      next();

   } catch (error){
    console.log(error);
   }
}

module.exports = isAuthenticated;










// const jwt = require('jsonwebtoken');

// const isAuthenticated = async (req, res, next) => {
//    try {
//       const token = req.cookies.token;
//       if (!token) {
//         return res.status(401).json({
//             message: "User not authenticated",
//             success: false
//         });
//       }

//       const decode = jwt.verify(token, process.env.SECRET_KEY); // 🔹 `await` hatao, verify sync hota hai

//       // if (!decode) {
//          if (!decode || !decode.userId) {
//          return res.status(401).json({
//             message: "Invalid token",
//             success: false
//          });
//       }

//       // req.user = { _id: decode.userId };  // ✅ `req.user` me userId set karo
//       req.user = { _id: decode.userId || decode.id };
//       next();
//    } catch (error) {
//       console.log("Authentication Error:", error);
//       return res.status(500).json({
//         message: "Internal Server Error",
//         success: false
//       });
//    }
// }

// module.exports = isAuthenticated;
