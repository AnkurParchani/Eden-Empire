// Remember to ALWAYS restart the server after doing any changes to the database.

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// IF there's any error
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception. SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./app.js";

const DB = process.env.VITE_DATABASE.replace(
  "<password>",
  process.env.VITE_DATABASE_PASSWORD,
);

// Connecting to DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log("Error connecting to database", err));

// If Unhandled Rejection found
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection. SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

//   Running the server
const port = 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
