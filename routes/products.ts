import express from "express";
import {
  getProductById,
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} from "../controllers/productController";
import { checkId } from "../middlewares";

const productRouter = express.Router();

productRouter.param("id", checkId);
productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export default productRouter;
