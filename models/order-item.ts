import mongoose, { Schema, trusted } from "mongoose";

export interface IOrderItem {}

const orderItemSchema: Schema<IOrderItem> = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

export default mongoose.model<IOrderItem>("orderItems", orderItemSchema);
