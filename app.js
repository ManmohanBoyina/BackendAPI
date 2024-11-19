const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
//! Connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/auth_api") // Using IPv4 explicitly
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.error("Connection error", e)); // Add better error logging

//! Middlewares
app.use(express.json()); // Pass incoming JSON data from the user

//! Routes
app.use("/", router);

//! Error handler
app.use(errorHandler);
//! Start the server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
