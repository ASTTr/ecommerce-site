import { Route, Routes } from "react-router-dom";
import { LoginUser } from "../components/loginUser";
import { RegisterUser } from "../components/RegisterUser";
import { Dashboard } from "../components/dashboard";

import { Myprofile } from "../components/Myprofile";
import { UploadProduct } from "../components/UploadProducts";
import { CartItems } from "../components/CartModel";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={LoginUser}></Route>
        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/myprofile" Component={Myprofile}></Route>
        <Route path="/addProduct" Component={UploadProduct}></Route>
        <Route path="/register" Component={RegisterUser}></Route>
        <Route path="/myCart" Component={CartItems}></Route>
      </Routes>
      {/* </userContext.Provider> */}
    </div>
  );
};
