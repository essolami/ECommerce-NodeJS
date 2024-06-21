import express, { json, Request, Response } from "express";
import Product from "../models/productSchema";

const productRouter = express.Router();

const products = [
  {
    id: "1",
    name: "product1",
    quantity: "10",
  },
  {
    id: "2",
    name: "product2",
    quantity: "13",
  },
];

// Route to handle POST requests to add a new product
productRouter.post("/", async (req: Request, res: Response) => {
  const { price, product_description, product_name } = req["body"];
  if (price && product_description && product_name) {
    const newProduct = new Product({
      product_name,
      price,
      product_description,
    });
    const createdBook = await newProduct.save();
    res.send(201).json(createdBook);
  }

  // return res.send("Nothing changed a bro");
});

// Route to handle GET requests to fetch all products
productRouter.get("/", async (req: Request, res: Response) => {
  const products = await Product.find({});
  return res.status(200).json({ count: products.length, data: products });
});

//Get single product
productRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (id) return res.send(201).json(product);
});

// update product
productRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newArr = products.filter((item) => item.id != id);
  if (id) return res.send([...newArr, req.body]);
});

// delete product
productRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newArr = products.filter((item) => item.id != id);
  if (id) return res.send(newArr);
});

export default productRouter;
