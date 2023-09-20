import mongoose from "mongoose";
import Item from "./itemsModel.js";
import User from "./userModel.js";

const bagSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: Item },
  user: { type: mongoose.Schema.ObjectId, ref: User },
  isChecked: { type: Boolean, default: true },
  size: String,
  color: String,
  quantity: Number,
});

const bagModel = mongoose.model("bag", bagSchema);

export default bagModel;
