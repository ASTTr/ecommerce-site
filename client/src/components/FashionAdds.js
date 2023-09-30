import { useState } from "react";

export const FashionSelect = () => {
  const items = ["item1", "item2", "item3"];
  const [itemNo, setItemNo] = useState(0);

  const previosFashionSelect = () => {
    if (itemNo == 0) {
      setItemNo(items.length - 1);
    } else {
      setItemNo(itemNo - 1);
    }
  };

  const nextFashionSelect = () => {
    if (itemNo < items.length - 1) {
      setItemNo(itemNo + 1);
    } else {
      setItemNo(0);
    }
  };

  return (
    <div className="fashion-select-container">
      <div className="item-fashion-image">
        <div onClick={() => previosFashionSelect()} className=" cursor-pointer">
          <span className="fashion-select-previous-btn">{"<"}</span>
        </div>
        <img
          src={`/fashionSelect/${items[itemNo]}.jpg`}
          className="p-4 fashion-select-image"
        />
        <div className=" cursor-pointer" onClick={() => nextFashionSelect()}>
          <span className="fashion-select-next-btn">{">"}</span>
        </div>
        <div className="d-flex justify-content-center">
          {items.map((e, index) => (
            <div
              className={`cursor-pointer fashion-item ${
                itemNo == index && "itemIsActive"
              }`}
              onClick={() => setItemNo(index)}
            >
              .
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
