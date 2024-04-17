import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate =useNavigate()
  const [formData, setformData] = useState({});
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const interviewerData = localStorage.getItem("forgotPassword_token");
  let data = JSON.parse(interviewerData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/changePassword", {...formData,...data})
      .then((data) => {
        console.log(data);
        toast("Password Reset Successfully")
        localStorage.removeItem("forgotPassword_token");
        navigate(`/${data.data}/login`)
      })
      .catch((error) => { 
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
      <form onSubmit={handleSubmit}>
        <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg">
          <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">
            Change Password
          </h1>
          <Input
            onChange={handleChange}
            className="w-72"
            type="password"
            label="Password"
            id="password"
            placeholder="Enter Your Password"
          />
          <Input
            onChange={handleChange}
            className="w-72"
            type="password"
            label="Confirm Password"
            id="confirmpassword"
            placeholder="ReEnter Your Password"
          />
          <Button className="w-36 m-5" type="submit">
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
