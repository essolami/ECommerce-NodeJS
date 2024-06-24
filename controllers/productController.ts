import { Request, Response } from "express";
import Product, { IProduct } from "../models/productSchema";
import mongoose, { Error } from "mongoose";

const getAllProducts = async (req: Request, res: Response) => {
  const allProducts: IProduct[] = await Product.find();
  if (!allProducts) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(allProducts);
};

const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    countInStock,
    category,
    price,
    description,
    image,
    images,
    richDescription,
    isFeatured,
    numReviews,
    rating,
  } = req.body;
  const newProduct = new Product({
    name,
    countInStock,
    description,
    image,
    images,
    richDescription,
    category,
    price,
    isFeatured,
    numReviews,
    rating,
  });
  newProduct
    .save()
    .then((createdProduct: IProduct) => res.status(201).json(createdProduct))
    .catch((errors: Error) => res.status(400).json(`${errors.message}`));
};

export const checkId = (req, res, next, value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json("Invalidate ID");
  }
  next();
};

// question : how to implement the param middleware for mongoDb

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
};

const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { $set: req.body });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res
    .status(200)
    .json({ message: "Updated successfully", data: product });
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res
    .status(200)
    .json({ message: "Deleted successfully", data: product });
};

export {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
