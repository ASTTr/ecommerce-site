const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const { userAuth } = require("../middlewares/auth");

router.post("/addItem", userAuth, cartController.addItem);
router.delete("/removeItem", cartController.removeItem);
router.get("/userCartItems", userAuth, cartController.getUserCartItems);

module.exports = router;
