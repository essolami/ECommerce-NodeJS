import express, { Request, Response } from "express";

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
productRouter.post("/", (req: Request, res: Response) => {
  console.log("Received POST request to add a product");
  if (req["body"]) {
    products.push(req["body"]);
    // Send a response
    return res.json(products);
  }
  return res.send("Nothing changed a bro");
});

// Route to handle GET requests to fetch all products
productRouter.get("/", (req: Request, res: Response) => {
  res.json(products);
});

//Get single product
productRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) return res.send(products.find((prod) => prod.id == id));
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
