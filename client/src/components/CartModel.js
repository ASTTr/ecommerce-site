import axios from "axios";
import { useEffect, useState } from "react";

export const CartItems = () => {
  const [userCartItems, setUserCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getUserCartItems();
  }, []);
  const getUserCartItems = async () => {
    try {
      let sum = 0;
      const userCart = await axios.get(
        "http://localhost:3030/api/cart/userCartItems",
        {
          params: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      const userCartProducts = userCart.data.map((e) => e.userProducts);
      userCartProducts.map((e) => (sum += e.price));
      setTotalPrice(sum);
      setUserCartItems(userCartProducts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>User Cart Items</div>
      <div className="d-flex">
        {userCartItems.map((e) => (
          <div>
            <img
              src={`http://127.0.0.1:3030/${e.selectedFiles[0]}`}
              className="p-3 "
              width={200}
              height={250}
            />
            <span>{e.price}</span>
          </div>
        ))}
        <div>{totalPrice}</div>
        <div>
          <button>CheckOut</button>
        </div>
      </div>
    </div>
  );
};
