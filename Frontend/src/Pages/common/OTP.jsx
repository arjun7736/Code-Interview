import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";

const OTP = () => {
  const {error,loading}=useSelector((state)=>state.company)
  const [formData, setformData] = useState({});
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(formData)
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-700">
      <h1 className="text-white my-3 font-bold">One-Time Password</h1>
      <div className=" container flex items-center justify-center shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} id="0" onChange={handleChange}/>
              <InputOTPSlot index={1} id="1"onChange={handleChange}/>
              <InputOTPSlot index={2} id="2"onChange={handleChange}/>
              <InputOTPSlot index={3} id="3"onChange={handleChange}/>
              <InputOTPSlot index={4} id="4"onChange={handleChange}/>
              <InputOTPSlot index={5} id="5"onChange={handleChange}/>
            </InputOTPGroup>
          </InputOTP>
          <h1 className="ml-20 my-3 text-white">Resent OTP</h1>
         { <Button className="ml-16 mb-5 w-28" type ="submit">{loading?<ScaleLoader color="white" height={20}/>:"Submit OTP"}</Button>}
        </form>
      </div>
    </div>
  );
};

export default OTP;
