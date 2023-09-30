const router = require("express").Router();
const productController = require("../controllers/productController.controller");
const { upload } = require("../utils/upload.utils");

router.post(
  "/addProduct",
  upload.array("productImages", 5),
  productController.addProduct
);

router.get("/getProducts", productController.getProducts);

module.exports = router;
