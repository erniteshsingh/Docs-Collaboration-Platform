import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
