const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authroute = require("./src/router/authroute");
const productroute = require("./src/router/productroute");
const categoryroute = require("./src/router/categoryroute");

const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authroute);
app.use("/product", productroute);
app.use("/category", categoryroute);

app.get("/", (req, res) => {
  res.json("hello world");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection Failed", error);
  });
