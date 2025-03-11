// const mongoose = require ("mongoose");

// const connectDB = async () => {
//     try{
//        await mongoose.connect(process.env.MONGO_URI);
//        console.log('MongoDB Connected');
//     } catch (error) {
//         console.log("error occured", error);
//     }
// }
// module.exports = connectDB; 






const mongoose = require ("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Avoid infinite waiting
    });

    console.log("🔥 MongoDB Connected");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
