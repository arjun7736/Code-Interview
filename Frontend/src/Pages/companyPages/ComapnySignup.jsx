import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import {
  clearError,
  signupError,
  signupStart,
  signupSuccess,
} from "@/redux/slices/companySlice";
import axios from "axios";

const ComapnySignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.company);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signupStart());
      await axios
        .post("/api/auth/company-signup", formData)
        .then((data) => {
          dispatch(signupSuccess());
          const CompanyData = JSON.stringify(data.data);
          localStorage.setItem("company_token", CompanyData);
          navigate("/otp");
        })
        .catch((error) => {
          dispatch(signupError(error.response.data.message));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-700 flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="container h-1/2 flex flex-col bg-transparent shadow-2xl rounded-lg items-center gap-5 ">
          <h1 className="font-extrabold  mt-10 text-white font-serif text-2xl">
            Company SignUp
          </h1>
          <Input
            className="w-72 mt-2"
            placeholder="Enter Your Company Name"
            type="text"
            name="name"
            id="name"
            label="Company Name"
            onChange={handleChange}
          />
          <Input
            className="w-72 mt-2"
            placeholder="Enter Your Company Mail"
            type="email"
            name="email"
            id="email"
            label="E-mail"
            onChange={handleChange}
          />
          <Input
            className="w-72 mt-2"
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
            label="Password"
            onChange={handleChange}
          />
          <Input
            className="w-72 mt-2"
            placeholder="Confirm Password"
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            label="Confirm Password"
            onChange={handleChange}
          />
          <p className="text-red-500 font-serif">{error ? error : ""}</p>
          <Button className="w-36 mt-3" type="submit" disabled={loading}>
            {loading ? <ScaleLoader color="white" /> : "SignUp"}
          </Button>
          <Link to="/company/login" onClick={() => dispatch(clearError())}>
            <h1 className="ml-32 text-blue-100 cursor-pointer mb-2">
              Already Have an Account ?
            </h1>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ComapnySignup;
