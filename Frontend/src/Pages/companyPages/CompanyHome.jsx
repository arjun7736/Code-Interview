import Navbar from "@/components/Navbar";
import React from "react";

const CompanyHome = () => {
  return (
    <div className="w-full h-screen bg-gray-700">
      <Navbar />
      <div className=" flex">
        <div className=" container w-1/2 bg-red-300 flex items-center justify-center">
          <h1 className="font-extrabold text-4xl font-serif">
            Welcome  to the company home page!
            <br />
            <br />
            You are Loggined as Company name
          </h1>
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
