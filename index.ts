import express, { urlencoded } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
import productRouter from "./routes/products";
import categoryRouter from "./routes/categories";
import usersRouter from "./routes/users";
// import ordersRoutes from "./routes/orders";

// initialisation of express
const app = express();

//middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
if (process.env.NODE_ENV === "developent") {
  app.use(morgan("dev"));
}

//Routes
const api = process.env.API_URL;
app.use(`/${api}/products`, productRouter);
app.use(`/${api}/categories`, categoryRouter);
app.use(`/${api}/users`, usersRouter);
// app.use(`/${api}/orders`,ordersRoutes);

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

// Server running
const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log("Connected to port 3000");
});
