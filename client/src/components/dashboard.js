import { Navbar } from "../common-Components/Navbar";
import { Footer } from "../common-Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { FashionSelect } from "./FashionAdds";
import { CommonVideo } from "../common-Components/CommonVideoComponent";

export const Dashboard = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const [cartItemIds, setCartItemIds] = useState([]);

  let changeIndex = 0,
    scrollNumber = 0;

  useEffect(() => {
    getAllProducts();
    getUserCartItems();
  }, []);

  const getAllProducts = async () => {
    try {
      const allProducts = await axios.get(
        "http://localhost:3030/api/products/getProducts"
      );
      setItemDetails(allProducts.data);
    } catch (err) {
      console.error(err);
    }
  };

  const showButtons = (itemNo) => {
    if (itemDetails[itemNo].selectedFiles.length > 1) {
      const forPrevItem = document.getElementById(`prev-btn${itemNo}`);
      const forNextItem = document.getElementById(`next-btn${itemNo}`);
      forPrevItem.classList.add("show-btn");
      forNextItem.classList.add("show-btn");
      forPrevItem.classList.remove("hide-btn");
      forNextItem.classList.remove("hide-btn");
    }
  };

  const hideButtons = (itemNo) => {
    if (itemDetails[itemNo].selectedFiles.length > 1) {
      const forPrevItem = document.getElementById(`prev-btn${itemNo}`);
      const forNextItem = document.getElementById(`next-btn${itemNo}`);
      forPrevItem.classList.remove("show-btn");
      forNextItem.classList.remove("show-btn");
      forPrevItem.classList.add("hide-btn");
      forNextItem.classList.add("hide-btn");
    }
  };

  const showNextImage = (imageIndex) => {
    const imageElement = document.getElementById(`selectedImage${imageIndex}`);
    changeIndex += 1;
    if (itemDetails[imageIndex].selectedFiles[changeIndex])
      imageElement.src = `http://127.0.0.1:3030/${itemDetails[imageIndex].selectedFiles[changeIndex]}`;
    else {
      changeIndex = 0;
      imageElement.src = `http://127.0.0.1:3030/${itemDetails[imageIndex].selectedFiles[changeIndex]}`;
    }
  };

  const showPreviosImage = (imageIndex) => {
    const imageElement = document.getElementById(`selectedImage${imageIndex}`);
    changeIndex -= 1;
    imageElement.src = `http://127.0.0.1:3030/${itemDetails[imageIndex].selectedFiles[changeIndex]}`;

    if (itemDetails[imageIndex].selectedFiles[changeIndex])
      imageElement.src = `http://127.0.0.1:3030/${itemDetails[imageIndex].selectedFiles[changeIndex]}`;
    else {
      changeIndex = itemDetails[imageIndex].selectedFiles.length - 1;
      imageElement.src = `http://127.0.0.1:3030/${itemDetails[imageIndex].selectedFiles[changeIndex]}`;
    }
  };

  const scrollNext = () => {
    const nextButtonElement = document.getElementById("scollBar");
    scrollNumber += 250;

    if (
      nextButtonElement.scrollLeft ===
      nextButtonElement.scrollWidth - nextButtonElement.clientWidth
    ) {
      // If we're at the end, set scrollLeft to 0 to go back to the start
      scrollNumber = 0;
    }
    nextButtonElement.scroll({
      top: 100,
      left: scrollNumber,
      behavior: "smooth",
    });
  };

  const scrollBack = () => {
    const prevButtonElement = document.getElementById("scollBar");
    if (prevButtonElement.scrollLeft <= 50) {
      scrollNumber =
        prevButtonElement.scrollWidth - prevButtonElement.clientWidth;
    } else {
      scrollNumber -= 250;
    }
    prevButtonElement.scroll({
      top: 100,
      left: scrollNumber,
      behavior: "smooth",
    });
  };

  const getUserCartItems = async () => {
    try {
      const userCart = await axios.get(
        "http://localhost:3030/api/cart/userCartItems",
        {
          params: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      const itemIds = userCart.data.map((e) => e.itemId);
      setCartItemIds(itemIds);
    } catch (err) {
      console.error(err);
    }
  };

  const addItemToCart = async (item) => {
    try {
      await axios.post(
        "http://localhost:3030/api/cart/addItem",
        {
          item,
        },
        {
          params: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      cartItemIds.push(item._id);
      setCartItemIds((old) => [...cartItemIds]);
    } catch (err) {
      console.error(err);
    }
  };
  const removeItemFromCart = async (item) => {
    try {
      await axios.delete("http://localhost:3030/api/cart/removeItem", {
        params: {
          item,
        },
      });
      const newCartList = cartItemIds.filter((e) => e != item._id);
      setCartItemIds(newCartList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column">
      <Navbar totalCartItems={cartItemIds.length} />
      <FashionSelect />
      <CommonVideo
        src={
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      />
      <div className="d-flex">
        <div
          onClick={() => scrollBack()}
          className="d-flex align-items-center justify-content-center cursor-pointer onto-buttons"
        >
          <span className="onto-items-btn">{"<"}</span>
        </div>
        <div className="d-flex scrollLeft" id="scollBar">
          {itemDetails.map((e, index) => (
            <div style={{ position: "relative" }}>
              {cartItemIds.includes(e._id) ? (
                <div
                  className="add-cart-btn cursor-pointer bg-danger"
                  onClick={() => removeItemFromCart(e, index)}
                >
                  -
                </div>
              ) : (
                <div
                  className="add-cart-btn cursor-pointer"
                  onClick={() => addItemToCart(e, index)}
                >
                  +
                </div>
              )}

              <div
                className="item-design"
                onMouseOver={() => showButtons(index)}
                onMouseOut={() => hideButtons(index)}
              >
                <div
                  className="d-flex align-items-center justify-content-center change-item-prev-button cursor-pointer hide-btn"
                  id={`next-btn${index}`}
                  onClick={() => showPreviosImage(index)}
                >
                  <span>{"<"}</span>
                </div>
                <img
                  src={`http://127.0.0.1:3030/${e.selectedFiles[0]}`}
                  className="p-3 "
                  width={200}
                  height={250}
                  id={`selectedImage${index}`}
                />
                <div
                  className="d-flex align-items-center justify-content-center cursor-pointer change-item-next-button hide-btn"
                  id={`prev-btn${index}`}
                  onClick={() => showNextImage(index)}
                >
                  <span>{">"}</span>
                </div>

                <div className="item-details d-flex flex-wrap flex-column align-items-center justify-content-center">
                  <span style={{ fontSize: "20px" }}>{e.productName}</span>
                  <p style={{ fontSize: "17px" }}>{e.price} $</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => scrollNext()}
          className="d-flex align-items-center justify-content-center cursor-pointer onto-buttons"
        >
          <span className="onto-items-btn">{">"}</span>
        </div>
      </div>
      <Footer />
      {/* <Modal.constainer>
        <Modal.header></Modal.header>
        <Modal.footer></Modal.footer>
      </Modal.constainer> */}
    </div>
  );
};
