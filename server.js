const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authroute = require("./src/router/authroute");
const productroute = require("./src/router/productroute");
require("dotenv").config();

app.use(express.json());

//router
app.use("/auth", authroute);
app.use("/product", productroute);

app.get("/", (req, res) => {
  res.json("hello world");
});
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
