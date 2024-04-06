import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const ComapnySignup = () => {
  
  return (
    <div className="w-full h-screen bg-gray-700 flex items-center justify-center">
      <form>
        <div className="container h-1/2 flex flex-col bg-transparent shadow-2xl rounded-lg items-center gap-5 ">
            <h1 className="font-extrabold text-lg mt-10 text-white">Company SignUp</h1>
          <Input className="w-72 mt-2" placeholder="Enter Your Company Name"/>
          <Input className="w-72 mt-2" placeholder="Enter Your Company Mail"/>
          <Input className="w-72 mt-2" placeholder="Enter Password"/>
          <Input className="w-72 mt-2" placeholder="Confirm Password"/>
          <Button className="w-36 mt-5" >SignUp</Button>
         <Link to="/company-login"><h1 className="ml-32 text-blue-100 cursor-pointer mb-2">Already Have an Account ?</h1></Link> 
        </div>
      </form>
    </div>
  );
};

export default ComapnySignup;
