import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginError, loginStart, loginSuccess } from "@/redux/slices/companySlice";


const CompanyLogin = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const dispatch =useDispatch()
  const {error,loading,userData}=useSelector((state)=>state.company)
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit =  (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
       axios
        .post("/api/auth/company-login", formData)
        .then((data) => {
          dispatch(loginSuccess(data.data))
          const CompanyData = JSON.stringify(data.data);
          localStorage.setItem('company_token', CompanyData);
          navigate("/company")
        })
        .catch((error) => {
          dispatch(loginError(error.response.data.message))
          console.log(error)
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg">
            <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">
              Company Login
            </h1>
            <Input
              className="w-72 mt-2"
              placeholder="Enter Your Email"
              type ="email"
              label="Email"
              onChange={handleChange}
              name="email"
              id="email"
            />
            <Input
              onChange={handleChange}
              className="w-72 mt-2"
              placeholder="Enter Your Password"
              type ="password"
              label="Password"
              name="password"
              id="password"
            />
            <p className="ml-32 text-blue-100 cursor-pointer" onClick={()=>navigate("/forgotPassword")}>Forgot Password ?</p>
            <p className="text-red-500 font-serif">{error?error:''}</p>
            <Button className="w-36 mt-2" type="submit" disabled={loading}>
              {loading?<ScaleLoader color="white" />: "Login"}
            </Button>
            <Link to="/company/signup" onClick={()=>dispatch(clearError())}>
              <h1 className="ml-32 text-blue-100 cursor-pointer mb-2">
                Don't Have an Account ?
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyLogin;
