const express = require("express");
const router = express.Router({ caseSensitive: true });

router.use("/userAuthentication", require("./user.routes"));
router.use("/products", require("./products.route"));
router.use("/cart", require("./cart.route"));

module.exports = router;
