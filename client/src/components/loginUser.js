import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import store from "../store";

export const LoginUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      navigate("/dashboard");
    }
  }, []);

  const loginUser = async (userdata) => {
    try {
      const data = await axios.get(
        "http://localhost:3030/api/userAuthentication/loginUser",
        {
          params: {
            userdata,
          },
        }
      );

      if (data.data.Success) {
        localStorage.setItem("Token", data.data.token);
        store.dispatch({
          type: "UPDATE_USER_INFO",
          payload: { user: data.data.userData },
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column login-tab align-items-center justify-content-center">
      <div className="login-header">Signin Now</div>
      <div className="header-underline"></div>
      <div className="">
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="p-3">
            <div className="d-flex m-2 h-15 justify-content-sm-between">
              <label> Email </label>
              <input
                {...register("email", { required: "Email is required" })}
                className="input-field"
                placeholder="Enter Your Email"
                type="email"
              />
              {errors.email && (
                <div className=" error-message">
                  <p className="d-flex flex-row-reverse text-danger">
                    {"*" + errors.email.message}
                  </p>
                </div>
              )}
            </div>
            <div className="">
              <div className="d-flex  m-2 justify-content-sm-between">
                <label> Password : </label>
                <div className="d-flex">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder="Enter Your Password"
                    className=" w-100 input-field"
                    type="password"
                    id="passwordShow"
                  />

                  <div
                    className="eye-button cursor-pointer"
                    onClick={() => {
                      if (
                        document.getElementById("passwordShow").type == "text"
                      )
                        document.getElementById("passwordShow").type =
                          "password";
                      else
                        document.getElementById("passwordShow").type = "text";
                    }}
                  >
                    <AiFillEye />
                  </div>
                  {errors.password && (
                    <div className="error-message">
                      <p className="d-flex flex-row-reverse text-danger">
                        {"*" + errors.password.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="login-btn m-2">
                Login
              </button>
              <p>
                {" "}
                Does not have an account{" "}
                <Link to="/register">Register here !!!</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
