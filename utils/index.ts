import mongoose from "mongoose";

// Function to find a document by ID
export const findById = async (model: mongoose.Model<any>, id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await model.findById(id).exec();
};

// Function to find and update a document by ID
export const findByIdAndUpdate = async (
  model: mongoose.Model<any>,
  id: string,
  update: any,
  options?: mongoose.QueryOptions
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await model.findByIdAndUpdate(
    id,
    { $set: update },
    options ?? { new: true }
  );
};

// Function to find and delete a document by ID
export const findByIdAndDelete = async (
  model: mongoose.Model<any>,
  id: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await model.findByIdAndDelete(id);
};

// Function to find all documents
export const findAll = async (model: mongoose.Model<any>) => {
  return await model.find();
};
