import axios from "axios";
import { useForm } from "react-hook-form";
// import store from "../store";
import { useState } from "react";

export const UploadProduct = () => {
  // const { userInfo } = store.getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadSelectedFiles = async (data) => {
    try {
      const formdata = new FormData();
      for (let file of data.selectedFiles) {
        formdata.append("productImages", file);
      }
      const uploadedData = await axios.post(
        "http://localhost:3030/api/products/addProduct",
        formdata,
        {
          params: { productData: data },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center w-50 p-5">
        <form
          onSubmit={handleSubmit(uploadSelectedFiles)}
          encType="multipart/form-data"
        >
          <div className="d-flex justify-content-sm-between">
            <label>Product Name : </label>
            <div>
              <input
                type="text"
                className="input-field w-100"
                {...register("productName", {
                  required: "Product Name Is Required",
                })}
              />
              {errors.productName && (
                <div className=" error-message">
                  <p className="d-flex flex-row-reverse text-danger">
                    {"*" + errors.productName.message}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex  justify-content-sm-between">
            <label>Price : </label>
            <div>
              <input
                type="Number"
                className="input-field w-100"
                {...register("price", {
                  required: "Price Is Required",
                })}
              />
              {errors.price && (
                <div className=" error-message">
                  <p className="d-flex flex-row-reverse text-danger">
                    {"*" + errors.price.message}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex  justify-content-sm-between">
            <label>Select Product Images : </label>
            <div>
              <input
                multiple
                type="file"
                className="input-field w-100"
                {...register("selectedFiles", {
                  required: "Image Is Required",
                })}
              />
              {errors.selectedFiles && (
                <div className=" error-message">
                  <p className="d-flex flex-row-reverse text-danger">
                    {"*" + errors.selectedFiles.message}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <button type="submit">upload</button>
          </div>
        </form>
        {/* {imageUrls.map()} */}
      </div>
    </div>
  );
};
