import { useEffect, useState } from "react";
import { Footer } from "../common-Components/Footer";
import { Navbar } from "../common-Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from "../store";

export const Myprofile = () => {
  // const { userInfo } = store.getState();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div
        className="bg-primary d-flex flex-column align-items-center justify-content-center"
        style={{ height: "600px", padding: "5px", margin: "3px" }}
      >
        {/* <div>
          <label>Name :</label>
          <span>{userInfo.user.name}</span>
        </div>
        <div>
          <label>Email :</label>
          <span>{userInfo.user.email}</span>
        </div>
        <div>
          <label>Address :</label>
          <span>{userInfo.user.address}</span>
        </div>
        <div>
          <label>Contact :</label>
          <span>{userInfo.user.contact}</span>
        </div> */}
        <button onClick={() => navigate("/addProduct")}>Upload Product</button>
      </div>
      <Footer />
    </div>
  );
};
