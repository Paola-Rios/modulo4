const fs = require("fs");

const productsPath = `${__dirname}/../data/products.json`;
//Handlers
exports.getAllProducts = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(productsPath)
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
  
  exports.addProduct = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(productsPath)
    );
    products.push(req.body);
    fs.writeFileSync(productsPath, JSON.stringify(products));
  
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  };
  
  exports.getProductById = (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(productsPath)
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

