import express from "express";
import morgan from "morgan";
import productRouter from "./routes/products";
import mongoose from "mongoose";
import "dotenv/config";
// import { isAuth } from "./middlewares";
// app.use(isAuth);

const app = express();
app.use(express.json());

app.use(morgan("tiny"));
app.use("/products", productRouter);

// MongoDB connection
const mongodbURL = process.env.MONGODB_URL;
if (!mongodbURL) {
  throw new Error("Environment variable MONGODB_URL must be defined");
}
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((error) => {
    console.log("Mongo DB Connection Error", error);
  });

const serverPort = process.env.PORT || 3000;

app.listen(serverPort, () => {
  console.log("Connected to port 3000");
});
