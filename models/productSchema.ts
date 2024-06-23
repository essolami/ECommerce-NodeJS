import mongoose, { Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  price?: number;
  category: mongoose.Schema.Types.ObjectId;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
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
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.model<IProduct>("product", productSchema);
