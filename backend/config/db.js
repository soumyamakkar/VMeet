const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://soumyamakkar123:soumyamakkar123@cluster0.vsldh.mongodb.net/video_chat_db?retryWrites=true&w=majority&appName=Cluster0", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error in connecting to MongoDB database");
  }
};

module.exports = connectDB;
