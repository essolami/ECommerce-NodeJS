import express, { Request, Response, NextFunction, urlencoded } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
import productRouter from "./routes/products";
import categoryRouter from "./routes/categories";
import usersRouter from "./routes/users";
import { authJwt, handleAuthErrors } from "./helpers/jwt"; // Updated import

// Initialisation of express
const app = express();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// JWT Authentication Middleware
app.use(authJwt());

// Routes
const api = process.env.API_URL;
app.use(`/${api}/products`, productRouter);
app.use(`/${api}/categories`, categoryRouter);
app.use(`/${api}/users`, usersRouter);

// MongoDB connection
const mongodbURL = process.env.MONGODB_URL;
if (!mongodbURL) {
  throw new Error("Environment variable MONGODB_URL must be defined");
}
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// Error handling middleware for auth errors
app.use(handleAuthErrors);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 Error Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Server running
const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log(`Connected to port ${serverPort}`);
});
