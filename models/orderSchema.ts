import mongoose, { Schema } from "mongoose";

export interface IOrder {}

const orderSchema: Schema<IOrder> = new Schema();

export default mongoose.model<IOrder>("order", orderSchema);
