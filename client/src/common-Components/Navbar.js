import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import avatar from "../assets/images/avatar.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

export const Navbar = ({ totalCartItems }) => {
  // const [totalItems, setTotalItems] = useState(0);
  const Navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("Token");
    Navigate("/dashboard");
  };

  // useEffect(() => {
  //   getCartItems();
  // }, []);

  // const getCartItems = async () => {
  //   try {
  //     const cartData = await axios.get(
  //       "http://localhost:3030/api/cart/userCartItems",
  //       {
  //         params: {
  //           token: localStorage.getItem("Token"),
  //         },
  //       }
  //     );
  //     setTotalItems(cartData.data.length);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div>
      <nav
        className="w-100 navbar navbar-expand-lg "
        style={{ backgroundColor: "black" }}
      >
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between mx-4">
          <Link to="/dashboard" className="navbar-brand">
            E-Commerce
          </Link>
          <div>
            <form className="d-flex form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="" className="nav-link" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <span className="total-cart-items">
                {/* {totalItems > 0 && totalItems} */}
                {totalCartItems > 0 && totalCartItems}
              </span>
              <Link to="/myCart" className="nav-link" href="#">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              {localStorage.getItem("Token") ? (
                <div>
                  <Dropdown.Container
                    className=""
                    toggle={<img src={avatar} className="avatar-image" />}
                    closeOnClick
                  >
                    <Dropdown.Item className="" eventkey="1" onClick={() => {}}>
                      <Link to="/myprofile"> My Profile </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="table-drop-down"
                      eventkey="1"
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Container>
                </div>
              ) : (
                <Link to="/" className="nav-link" href="#">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
