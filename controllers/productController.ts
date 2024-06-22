import { Request, Response } from "express";
import mongoose from "mongoose";
import Product, { IProduct } from "../models/productSchema";
import { body, param, validationResult } from "express-validator";

// Validation rules
const validateProductId = param("id")
  .isMongoId()
  .withMessage("Invalid product ID format");
const validateProductCreation = [
  body("price").isNumeric().withMessage("Price must be a number"),
  body("product_description")
    .isString()
    .withMessage("Product description must be a string"),
  body("product_name").isString().withMessage("Product name must be a string"),
];

const handleValidationErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;
  try {
    const { price, product_description, product_name } = req.body;
    if (!price || !product_description || !product_name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct: IProduct = new Product({
      product_name,
      price,
      product_description,
    });
    const createdProduct = await newProduct.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;
  try {
    const products = await Product.find();
    return res.status(200).json({ count: products.length, data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Updated successfully", data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
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
  validateProductId,
  validateProductCreation,
};
