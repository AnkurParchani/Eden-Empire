import mongoose from "mongoose";
import Item from "./itemsModel.js";
import User from "./userModel.js";

const wishListSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: Item },
  user: { type: mongoose.Schema.ObjectId, ref: User },
});

const WishList = mongoose.model("wishlist", wishListSchema);

export default WishList;
