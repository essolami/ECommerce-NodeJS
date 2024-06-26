import express from "express";
import Category from "../models/categorySchema";

const categoryRouter = express.Router();

// * Get all categories :
categoryRouter.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// * Get category by ID :
categoryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(category);
});

// * Add category :
categoryRouter.post("/", async (req, res) => {
  let category = new Category(req.body);

  category = await category.save();

  if (!category) {
    res.status(404).send("the category cannot be created");
  }
  res.send(category);
});

// * Delete category :
categoryRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "the category was deleted successufully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// * Update category :
categoryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  Category.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "the category was updated successufully",
          data: category,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});
export default categoryRouter;
