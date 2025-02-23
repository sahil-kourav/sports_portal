const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res) => {
   try {
      const token = req.cookies.token;
      if(!token){
        return res.status(401).json({
            message: "User not authenticated",
            success: false
        })
      }
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
      if(!decode){

      }
   } catch (error){
    console.log(error);
   }
}