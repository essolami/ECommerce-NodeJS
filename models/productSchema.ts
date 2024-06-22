import mongoose, { Schema } from "mongoose";

export interface IProduct {
  product_name: string;
  product_description: string;
  price: number;
  [key: string]: any;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.model<IProduct>("product", productSchema);
