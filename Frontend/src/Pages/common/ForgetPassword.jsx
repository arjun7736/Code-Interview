import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "", role: "" });

  const [error,setError]= useState("")
const navigate =useNavigate()
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/forgotPassword", formData)
      .then((data) => {
        const CompanyData = JSON.stringify(data.data);
        localStorage.setItem("forgotPassword_token", CompanyData);
        navigate("/forgotPassword-otp")
        toast("OTP Sent To the E-Mail")
        console.log(data);
      })
      .catch((error) => {
        setError(error.response.data.message)
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg">
            <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">
              Forgot Password
            </h1>
            <Input
              onChange={handleChange}
              className="w-72"
              type="email"
              label="Email"
              id="email"
              placeholder="Enter Your Email"
            />
            <select
              value={formData.role}
              onChange={handleRoleChange}
              className="w-72 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Select Your Role
              </option>
              <option value="company">Company</option>
              <option value="interviewee">Interviewee</option>
            </select>
            <p className="text-red-500 font-serif">{error ? error : ""}</p>
            <Button className="w-28 m-5" type="submit">
              Sent OTP
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
