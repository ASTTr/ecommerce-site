const router = require("express").Router();
const usercontroller = require("../controllers/userController.controller");

router.get("/loginUser", usercontroller.loginUser);

// router.post(
//   "/saveAllData",
//   upload.fields([
//     { name: "videoFile", maxCount: 1 },
//     { name: "screenFile", maxCount: 1 },
//     { name: "newFile", maxCount: 1 },
//   ]),
//   usercontroller.saveAllData
// );

router.get("/loginedUser", usercontroller.loginedUser);

router.post("/register", usercontroller.registerUser);

module.exports = router;
