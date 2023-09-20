import express from "express";
import cors from "cors";

import AppError from "./utils/appError.js";

import itemsRoutes from "./routes/itemsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishListRoutes from "./routes/wishListRoutes.js";
import bagRoutes from "./routes/bagRoutes.js";

const app = express();

// Important packages
app.use(cors());

// To accept JSON data from postman
app.use(express.json());

// Using public directory
app.use(express.static("public"));

// APIs to all different routes
app.use("/items", itemsRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/address", addressRoutes);
app.use("/wishlist", wishListRoutes);
app.use("/bag", bagRoutes);
app.use("/users", userRoutes);
app.use("*", (req, res, next) => {
  next(new AppError(400, `Can't find ${req.originalUrl} on this server!`));
});

// Error handling middleware for appError
app.use((err, req, res, next) => {
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Sending to server.js
export default app;
