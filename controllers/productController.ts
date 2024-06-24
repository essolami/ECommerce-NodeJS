import { NextFunction, Response } from "express";
import Product from "../models/productSchema";
import { IProduct } from "../types/products";
import mongoose from "mongoose";
import { CustomRequest } from "../types/common";

const checkId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
  value: string
) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const product = await Product.findById(value);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  req.product = product;
  next();
};

// Get all Products route
const getAllProducts = async (_: CustomRequest, res: Response) => {
  try {
    const allProducts: IProduct[] = await Product.find();
    return res
      .status(200)
      .json({ count: allProducts.length, data: allProducts });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Add new Product route
const createProduct = async (req: CustomRequest, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const createdProduct: IProduct = await newProduct.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(400).json({ message: "Error creating product", error });
  }
};

// Get Product by ID route
const getProductById = (req: CustomRequest, res: Response) => {
  if (!req.product) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ message: "Product by ID", data: req.product });
};

// Update Product route
const updateProductById = async (req: CustomRequest, res: Response) => {
  if (!req.product) {
    return res.status(500).json({ message: "Internal server error" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.product.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Updated successfully", data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete Product route
const deleteProductById = async (req: CustomRequest, res: Response) => {
  if (!req.product) {
    return res.status(500).json({ message: "Internal server error" });
  }
  try {
    await Product.findByIdAndDelete(req.product.id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  checkId,
};
