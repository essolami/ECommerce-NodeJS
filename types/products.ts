import mongoose from "mongoose";

export interface IProduct {
  id?: string;
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
