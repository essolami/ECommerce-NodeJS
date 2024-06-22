import express from "express";

import {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  validateProductId,
  validateProductCreation,
} from "../controllers/productController";

const productRouter = express.Router();

// Get single product
productRouter.get("/:id", validateProductId, getProductById);

// Create a new product
productRouter.post("/", validateProductCreation, createProduct);

// Get all products
productRouter.get("/", getAllProducts);

// Update product by ID
productRouter.put(
  "/:id",
  validateProductId,
  validateProductCreation,
  updateProductById
);

// Delete product by ID
productRouter.delete("/:id", validateProductId, deleteProductById);

export default productRouter;
