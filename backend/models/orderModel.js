import mongoose from "mongoose";

import User from "./userModel.js";
import Item from "./itemsModel.js";
import Address from "./addressModel.js";

const orderSchema = new mongoose.Schema({
  totalQuantity: Number,
  orderColor: String,
  orderSize: String,
  totalAmount: Number,
  orderDate: String,
  user: { type: mongoose.Schema.ObjectId, ref: User },
  item: { type: mongoose.Schema.ObjectId, ref: Item },
  address: { type: mongoose.Schema.ObjectId, ref: Address },
});

orderSchema.pre("save", function (next) {
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

  this.orderDate = `${day} ${monthName[month]} ${year}`;
  next();
});

const Order = mongoose.model("order", orderSchema);

export default Order;
