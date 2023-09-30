const userManagers = require("../managers/usermanager.manager");

const loginUser = (req, res) => {
  userManagers
    .loginUser(req.query)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

const registerUser = (req, res) => {
  userManagers
    .registerUser(req.body)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

const loginedUser = (req, res) => {
  userManagers
    .loginedUser(req.query)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

const addProduct = (req, res) => {
  userManagers
    .addProduct(req)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  loginUser,
  registerUser,
  loginedUser,
  addProduct,
};
