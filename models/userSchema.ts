import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/users";

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IUser>("user", userSchema);
