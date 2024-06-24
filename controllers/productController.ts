import { NextFunction, Response, Request } from "express";
import Product from "../models/productSchema";
import { IProduct } from "../types/products";
import mongoose from "mongoose";

const checkId = async (
  _: Request,
  res: Response,
  next: NextFunction,
  value: string
) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

// Get all Products route
const getAllProducts = async (_: Request, res: Response) => {
  await Product.find()
    .then((products) => {
      return res.status(200).json({ count: products.length, data: products });
    })
    .catch((error) => {
      return res
        .status(404)
        .json({ message: "There is error on the server", error });
    });
};

// Add new Product route
const createProduct = async (req: Request, res: Response) => {
  new Product(req.body)
    .save()
    .then((product: IProduct) => {
      return res.status(201).json(product);
    })
    .catch((error) => {
      return res.status(400).json({ message: "Error creating product", error });
    });
};

// Get Product by ID route
const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Product.findById(id)
    .then((product) => {
      return res.status(200).json({ message: "Product by ID", data: product });
    })
    .catch((error) => {
      return res.status(400).json({ message: "Error creating product", error });
    });
};

// Update Product route
const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((updatedProduct) => {
      return res
        .status(200)
        .json({ message: "Updated successfully", data: updatedProduct });
    })
    .catch((error) => {
      return res
        .status(404)
        .json({ message: "There is error on the server", error });
    });
};

// Delete Product route
const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json({ message: "Deleted successfully" });
    })
    .catch(() => {
      return res.status(404).json({ message: "There is error on the server" });
    });
};

export {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  checkId,
};
