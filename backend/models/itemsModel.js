import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide item name"],
  },

  priceBeforeDiscount: {
    type: Number,
    required: [true, "Please provide item price"],
  },

  discount: Number,
  discountPercentage: Number,

  gender: String,
  priceAfterDiscount: Number,

  category: {
    type: String,
  },

  inStock: Boolean,
  maxOrderQuantity: Number,

  // These 2 are unrelated to multer, they are just to save that image name in database
  mainImageFilename: {
    type: String,
  },
  extraImagesFilename: [String],

  details: {
    // Will include weight, manufacturer, importer, model number etc
    type: Object,
  },

  instructions: String,

  description: {
    // Will include visitLink, tags, size, color
    type: Object,
  },
});

itemSchema.pre("save", function (next) {
  // Setting the discount
  this.discount =
    Number(this.priceBeforeDiscount) - Number(this.priceAfterDiscount);

  // Setting the discount percentage
  this.discountPercentage = Math.floor(
    ((this.priceBeforeDiscount - this.priceAfterDiscount) /
      this.priceBeforeDiscount) *
      100,
  );
  next();
});

const Item = mongoose.model("item", itemSchema);

export default Item;
