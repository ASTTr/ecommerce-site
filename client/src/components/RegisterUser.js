import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      navigate("/dashboard");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    try {
      console.log(data);
      const registeredData = await axios.post(
        "http://localhost:3030/api/userAuthentication/register",
        { data }
      );
      console.log(registeredData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" d-flex register-user flex-column ">
      <div className="login-header"> Signup Now</div>
      <div className="header-underline"></div>
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="p-3">
          <div className="d-flex justify-content-sm-around">
            <div className="input-div d-flex m-2 justify-content-sm-between">
              <label> Name : </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter Your Name : Team Hockeye"
                className="input-field"
                type="text"
              />
            </div>{" "}
            {errors.name && (
              <div className="error-message">
                <p className="d-flex flex-row-reverse text-danger ">
                  {"*" + errors.name.message}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-around">
            <div className="input-div d-flex m-2 justify-content-sm-between">
              <label> Email : </label>
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Enter Your Email : someone@gmail.com"
                className="input-field"
                type="email"
              />
            </div>
            {errors.email && (
              <div className="error-message">
                <p className="d-flex flex-row-reverse text-danger">
                  {"*" + errors.email.message}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-around">
            <div className="input-div d-flex m-2 justify-content-sm-between">
              <label> Password : </label>
              <input
                {...register("password", { required: "Password is required" })}
                placeholder="Enter Your password : 12345qwert"
                className="input-field"
                type="password"
              />
            </div>
            {errors.password && (
              <div className="error-message">
                <p className="d-flex flex-row-reverse text-danger">
                  {"*" + errors.password.message}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-around">
            <div className="input-div d-flex m-2 justify-content-sm-between">
              <label> Confirm Password : </label>
              <input
                {...register("Cpass", {
                  required: "Please Confirm Your Password",
                })}
                placeholder="Enter Your Password Again : 12345qwert"
                className="input-field"
                type="password"
              />
            </div>
            {errors.Cpass && (
              <div className="error-message">
                <p className="d-flex flex-row-reverse text-danger">
                  {"*" + errors.Cpass.message}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-around">
            <div className=" input-div d-flex m-2 justify-content-sm-between">
              <label> Address : </label>
              <input
                {...register("address")}
                placeholder="Enter Your Address : Uttar Pradesh , Noida"
                className="input-field"
                type="text"
              />
            </div>
            {errors.address && (
              <div className="error-message">
                <p className="d-flex flex-row-reverse text-danger">
                  {"*" + errors.address.message}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-around">
            <div className="input-div d-flex m-2 justify-content-sm-between">
              <label> Contact : </label>
              <input
                {...register("contact", { required: "Contact is required" })}
                placeholder="Enter Your Email : +91 0123456789"
                className="input-field"
                type="number"
              />
            </div>
            {errors.contact && (
              <div className=" error-message">
                <p className="d-flex flex-row-reverse text-danger">
                  {"*" + errors.contact.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <button type="submit" className="login-btn m-2">
              Register
            </button>
            <p>
              {" "}
              Already have an account <Link to="/">Login Now </Link>
              !!
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
