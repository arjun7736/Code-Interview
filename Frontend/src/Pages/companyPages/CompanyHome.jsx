import Navbar from "@/components/Navbar";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import React  from "react";
import axios from "axios";

const CompanyHome = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .get("/api/auth/logout")
      .then((data) => {
        localStorage.removeItem(data.data.user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="w-full h-screen bg-gray-700">
      <div className=" flex">
        <div className=" container w-1/2 bg-red-300 flex items-center justify-center">
          <h1 className="font-extrabold text-4xl font-serif">
            Welcome to the company home page!
            <br />
            <br />
            You are Loggined as Company name
          </h1>
          <Button onClick={logout}>logout</Button>
        </div>
        <div className=" container w-1/2 bg-green-300 flex items-center justify-center">
          <div className="container w-96 h-96 bg-blue-300 my-5 rounded-xl flex justify-center ">
            <h1 className="font-">InterViewers</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
