const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (data) => {
  try {
    const user = await userModel.findOne({ email: data.userdata.email });
    let token;
    if (!user) {
      return {
        Success: false,
        message: "Invalid Email !",
      };
    } else {
      const comparePassword = await bcrypt.compare(
        data.userdata.password,
        user.password
      );
      if (!comparePassword)
        return {
          Success: false,
          message: "Incorrect Password",
        };
      token = jwt.sign({ email: user.email, name: user.name }, "secret@123");
    }

    return {
      token: token,
      Success: true,
      message: "LoggedIn Successfully",
      userData: user,
    };
  } catch (err) {
    console.error(err);
  }
};

const registerUser = async (data) => {
  try {
    const password = await bcrypt.hash(data.data.password, 10);
    data.data.password = password;
    const user = await userModel.findOne({ email: data.data.email });
    if (user) {
      return { Success: false, message: "User Already Exists !" };
    } else if (!user) {
      (await userModel.create(data.data)).save();
    }
  } catch (err) {
    console.error(err);
  }
};

const loginedUser = async (data) => {
  try {
    const tokenDetails = jwt.decode(data.Token);
    const userDetails = await userModel.findOne({ email: tokenDetails.email });
    return userDetails;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  loginUser,
  registerUser,
  loginedUser,
};
