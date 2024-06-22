import mongoose, { Schema } from "mongoose";

export interface ICategory {}

const categorySchema: Schema<ICategory> = new Schema();

export default mongoose.model<ICategory>("category", categorySchema);
