const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Regular registration fields
  username: {
    type: String,
    required: function() { return !this.githubId && !this.googleId; },  
  },
  email: {
    type: String,
    required: true,
    unique: true,  
  },
  password: {
    type: String,
    required: function() { return !this.githubId && !this.googleId; }, 
  },
  // institute: {
  //   type: String,
  //   required: function() { return !this.githubId && !this.googleId; }, 
  // },
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: function() { return !this.githubId && !this.googleId; },  // Only required if no OAuth is used
  },

  // OAuth-specific fields
  githubId: {
    type: String,
    sparse: true, // Allows either email or githubId to be unique
  },
  googleId: {
    type: String,
    sparse: true, // Allows either email or googleId to be unique
  },
  avatarUrl: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
