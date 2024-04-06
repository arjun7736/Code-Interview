import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const OTP = () => {
  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setLoading(!loading);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-700">
      <h1 className="text-white my-3 font-bold">One-Time Password</h1>
      <div className=" container flex items-center justify-center shadow-lg w-96">
        <form>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <h1 className="ml-20 my-3 text-white">Resent OTP</h1>
         { <Button className="ml-16 mb-5 w-28" onClick={changeState}>{loading?<ScaleLoader color="white" height={20}/>:"Submit OTP"}</Button>}
        </form>
      </div>
    </div>
  );
};

export default OTP;
