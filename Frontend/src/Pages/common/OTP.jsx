import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { otpVerificationError, otpVerificationStart, otpVerified } from "@/redux/slices/tempSlice";
import { toast } from "sonner";

const OTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const interviewerData = localStorage.getItem("interviewer_token");
  const intervieweeData = localStorage.getItem("interviewee_token");
  const companyData = localStorage.getItem("company_token");

  const { error, loading } = useSelector((state) => state.temp);
  const [otp, setotp] = useState("");
  let data = null;
  if (interviewerData) {
    data = JSON.parse(interviewerData);
    console.log(data);
  } else if (intervieweeData) {
    data = JSON.parse(intervieweeData)
    console.log(data);
  } else {
    data = JSON.parse(companyData);
    console.log(data);
  }
  const handleSubmit = async (e) => {
    dispatch(otpVerificationStart())
    e.preventDefault();
    await axios
      .post("/api/auth/verify-otp", {otp,...data})
      .then((value) => {
        dispatch(otpVerified())
        navigate(`/${data.userType}/login`)
        localStorage.removeItem(`${data.userType}_token`);
        toast("OTP Verified Successfully")
      })
      .catch((error) => {
        dispatch(otpVerificationError(error.response.data.message))
        console.log(error);
      });
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-700">
      <h1 className="text-white my-3 font-bold">One-Time Password</h1>
      <div className=" container flex items-center justify-center shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(otp) => setotp(otp)}
          >
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
          {
            <Button className="ml-16 mb-5 w-28" type="submit">
              {loading ? (
                <ScaleLoader color="white" height={20} />
              ) : (
                "Submit OTP"
              )}
            </Button>
          }
        </form>
      </div>
    </div>
  );
};

export default OTP;
