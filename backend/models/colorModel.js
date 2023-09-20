import mongoose from "mongoose";

import Item from "./itemsModel.js";

const colorSchema = new mongoose.Schema({
  color: String,
  images: [String],
  item: {
    type: mongoose.Schema.ObjectId,
    ref: Item,
  },
});

const Color = mongoose.model("color", colorSchema);

export default Color;
