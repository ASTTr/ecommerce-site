const productModel = require("../models/productModel");

const addProduct = async ({ files, query }) => {
  try {
    const productPathList = [];
    for (let file of files) {
      const productPath = `Images/${file.filename}`;
      productPathList.push(productPath);
    }
    await productModel.create({
      productName: query.productData.productName,
      price: query.productData.price,
      selectedFiles: productPathList,
      // userId: query.userId,
    });

    return { message: "product uploaded successfully" };
  } catch (err) {
    console.error(err);
  }
};

const getProducts = async () => {
  try {
    const allProducts = await productModel.find({});
    return allProducts;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addProduct,
  getProducts,
};
