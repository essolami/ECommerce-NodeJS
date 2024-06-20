import express from "express";
import "dotenv/config";
import { isAuth } from "./middlewares";
import userRouter from "./routes/users";
import mongoose from "mongoose";

const app = express();
app.use(isAuth);

app.use("/users", userRouter);

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
