import mongoose, { Schema } from "mongoose";

const orderSchema: Schema = new Schema({
  orderItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderItems",
    required: true,
  },
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("order", orderSchema);
