const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Images");
  },
  filename: function (req, file, cb) {
    const uniqueName = `ecommerce${Date.now() + file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

module.exports = { upload };
