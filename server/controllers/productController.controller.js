const productManager = require("../managers/productmanager.manager");

const addProduct = (req, res) => {
  productManager
    .addProduct(req)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

const getProducts = (req, res) => {
  productManager
    .getProducts()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  addProduct,
  getProducts,
};
