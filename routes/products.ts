import express from "express";

import {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  checkId,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.param("id", checkId);
productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter
  .route("/:id")
  .get(updateProductById)
  .post(deleteProductById)
  .get(getProductById);

export default productRouter;
