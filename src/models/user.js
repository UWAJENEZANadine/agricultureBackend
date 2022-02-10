import Mongoose from "mongoose";
const userSchema = new Mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "Rwanda",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "not-say"],
    },

    role: {
      type: String,
      default: "buyer",
      enum: ["admin", "buyer", "seller"],
    },
  },
  {
    timestamps: true,
  }
);

const user = Mongoose.model("User", userSchema);
export default user;
