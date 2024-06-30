import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/products";

export type IOrderItem = {
  _id?: string;
  quantity: number;
  product: IProduct;
};

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
