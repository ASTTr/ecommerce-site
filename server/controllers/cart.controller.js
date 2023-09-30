const cartManager = require("../managers/cart.manager");

const addItem = (req, res) => {
  cartManager
    .addItem(req.body.item, req.userId)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

const removeItem = (req, res) => {
  cartManager
    .removeItem(req.query.item)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

const getUserCartItems = (req, res) => {
  cartManager
    .getUserCartItems(req.userId)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

module.exports = { addItem, removeItem, getUserCartItems };
