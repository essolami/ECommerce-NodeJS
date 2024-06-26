import express from "express";
import Category from "../models/categorySchema";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

categoryRouter.post("/", async (req, res) => {
  let category = new Category(req.body);

  category = await category.save();

  if (!category) {
    res.status(404).send("the category cannot be created");
  }
  res.send(category);
});

export default categoryRouter;
