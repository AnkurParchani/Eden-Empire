import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "This email has already been used by someone else"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match.",
    },
  },
  photo: {
    type: String,
    required: false,
    default: "default-profile-photo.jpg",
  },
  createdAt: { type: Date, default: Date.now() },
  role: { type: String, default: "user" },
  adminKey: {
    type: String,
    requierd: [false],
  },
});

// Pre-save middleware
userSchema.pre("save", async function () {
  // Encrypting password
  this.password = await bcrypt.hash(this.password, 12);

  // Removing passwordConfirm and adminKey
  this.adminKey = undefined;
  this.passwordConfirm = undefined;
});

// Instance method
userSchema.methods.checkCredentials = async (userPassword, dbPassword) => {
  return await bcrypt.compare(userPassword, dbPassword);
};

// Creating Index for emails
userSchema.index({ email: 1 }, { unique: true });

// Getting all his other details through virtual populate
userSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "user",
  localField: "_id",
});
// Getting all his other details through virtual populate
userSchema.virtual("orders", {
  ref: "Order",
  foreignField: "user",
  localField: "_id",
});

// Creating Model
const User = mongoose.model("User", userSchema);

export default User;
