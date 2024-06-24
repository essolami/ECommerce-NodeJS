import { Request } from "express";
import { IProduct } from "./products";

export interface CustomRequest extends Request {
  product?: IProduct;
}
