const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/productRoutes");
const app = express();
//Request the controllers from the file that handle all the controllers
const productController = require("./controllers/productController")


//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
 

app.use("/api/v1/products/", productRouter);


module.exports = app;