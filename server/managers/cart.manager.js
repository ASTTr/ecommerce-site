const CartModel = require("../models/CartModel");

const addItem = async (item, userId) => {
  try {
    const checkItem = await CartModel.findOne({ itemId: item._id });
    if (checkItem && item.totalItems) {
      await CartModel.updateOne(
        { _id: checkItem._id },
        {
          itemName: item.productName,
          itemId: item._id,
          itemPrice: item.price,
          numberOfItems: item.totalItems,
        }
      );
    } else {
      const addedItem = await CartModel.create({
        itemName: item.productName,
        itemId: item._id,
        itemPrice: item.price,
        userId: userId,
      });

      return { addedItem, message: "Added To Cart !" };
    }
  } catch (err) {
    console.error(err);
  }
};

const getUserCartItems = async (userId) => {
  try {
    const userCartItems = await CartModel.aggregate([
      {
        $match: { userId: userId.toString() },
      },
      {
        $lookup: {
          from: "products",
          localField: "itemId",
          foreignField: "_id",
          as: "userProducts",
        },
      },
      {
        $unwind: "$userProducts",
      },
    ]);
    return userCartItems;
  } catch (err) {
    console.error(err);
  }
};

const removeItem = async (item) => {
  try {
    await CartModel.deleteOne({
      itemId: item._id.toString(),
    });
    return { message: "Removed From Cart" };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addItem,
  removeItem,
  getUserCartItems,
};
