import express from "express";

import {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} from "../controllers/productController";

const productRouter = express.Router();

// Get single product
productRouter.get("/:id", getProductById);

// Create a new product
productRouter.post("/", createProduct);

// Get all products
productRouter.get("/", getAllProducts);

// Update product by ID
productRouter.put("/:id", updateProductById);

// Delete product by ID
productRouter.delete("/:id", deleteProductById);

export default productRouter;
