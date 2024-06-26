import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/category";

const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

export default mongoose.model<ICategory>("category", categorySchema);
