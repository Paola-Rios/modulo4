const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = process.env.PORT;
//Handlers
const getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

const addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

const removeProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {

    const position = products.indexOf(foundProduct);
    products.splice(position, 1);
    fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));

    res.status(200).json({
      status: "success",
      pos: position,
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
}

const updateProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products.json`)
  );
  var foundProduct = products.find((p) => p.id == req.params.id);

  if (foundProduct) {
    foundProduct.name = req.body.name;
    foundProduct.price=req.body.price;
    foundProduct.category = req.body.category;
    
    fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });

  } else {
    res.status(404).json({
      status: "not found",
    });
  }

}

const getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
const productRouter = express.Router();
app.use("/api/v1/products/", productRouter);

//routes
productRouter.route("/").get(getAllProducts).post(addProduct);
productRouter.route("/:id").get(getProductById);
productRouter.route("/:id").delete(removeProductById);
productRouter.route("/:id").put(updateProduct);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
