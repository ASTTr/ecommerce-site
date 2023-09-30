const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    if (req.query.token) {
      const decodeToken = jwt.decode(req.query.token, "secret@123");
      const user = await userModel.findOne({ email: decodeToken.email });
      req.userId = user._id;
      next();
    } else {
      return res.status(401).send({ message: "Please Login !!!" });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { userAuth };
