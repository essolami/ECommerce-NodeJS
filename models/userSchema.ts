import mongoose, { Schema } from "mongoose";

export interface IUser {
  name?: string;
  image?: string;
  countInStock: number;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IUser>("user", userSchema);
