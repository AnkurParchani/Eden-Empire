import mongoose from "mongoose";
import Item from "./itemsModel.js";
import User from "./userModel.js";

const reviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, "please give stars to the review"],
  },
  review: { type: String, required: [true, "please provide the review"] },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: Item,
  },
  reviewDate: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  inTrash: { type: Boolean, default: false },
});

reviewSchema.pre("save", function (next) {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth());
  const year = currentDate.getFullYear();

  this.reviewDate = `${day} ${monthName[month]} ${year}`;
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
