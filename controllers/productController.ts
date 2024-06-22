import { Request, Response } from "express";
import Product, { IProduct } from "../models/productSchema";
import {
  findAll,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
} from "../utils/dbOperations";
import { Error } from "mongoose";

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findById(Product, id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedProduct = await findByIdAndUpdate(Product, id, req.body);
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
  const { id } = req.params;
  try {
    const deletedProduct = await findByIdAndDelete(Product, id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const allProducts: IProduct[] = await Product.find();
  if (!allProducts) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(allProducts);
};

const createProduct = async (req: Request, res: Response) => {
  const { price, product_description, product_name } = req.body;
  const newProduct = new Product({
    product_name,
    price,
    product_description,
  });
  newProduct
    .save()
    .then((createdProduct: IProduct) => res.status(201).json(createdProduct))
    .catch((errors: Error) => res.status(400).json(`${errors.message}`));
};

export {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
