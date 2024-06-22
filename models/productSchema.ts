import mongoose, { Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  countInStock: number;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    richDescription: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
    countInStock: {
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
