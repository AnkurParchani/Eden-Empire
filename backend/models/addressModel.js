import mongoose from "mongoose";
import User from "./userModel.js";

const addressSchema = new mongoose.Schema({
  country: { type: String, required: [true, "Please specify country"] },
  fullName: { type: String, required: [true, "Please specify your Name"] },
  phoneNumber: {
    type: String,
    required: [true, "Please specify your Phone Number"],
  },
  pincode: { type: Number, required: [true, "Please specify your Pincode"] },
  typeOfAddress: {
    type: String,
    required: [true, "Please specify the type of Address"],
  },
  flatNumber: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Please specify your Area"],
  },
  flatArea: { type: String, required: [true, "Please specify your Area"] },
  city: { type: String, required: [true, "Please specify your City"] },
  state: { type: String, required: [true, "Please specify your State"] },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  isDeleted: { type: Boolean, default: false },
  inTrash: { type: Boolean, default: false },
  isDeliveryAddress: { type: Boolean },
});

const Address = mongoose.model("address", addressSchema);

export default Address;
