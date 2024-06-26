import mongoose from "mongoose";
export interface IProduct {
  id?: string;
  name: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  countInStock: number;
  image?: string;
  price?: number;
  rating?: number;
  images?: string[];
  numReviews?: number;
  isFeatured?: boolean;
  richDescription?: string;
  dateCreated?: Date;
}
