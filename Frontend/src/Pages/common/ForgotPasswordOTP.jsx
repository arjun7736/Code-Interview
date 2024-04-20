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
import {
  otpVerificationError,
  otpVerificationStart,
  otpVerified,
} from "@/redux/slices/tempSlice";
import { toast } from "sonner";

const ForgotPasswordOTP = () => {
  const { error, loading } = useSelector((state) => state.temp);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setotp] = useState("");

  const interviewerData = localStorage.getItem("forgotPassword_token");
  let data = JSON.parse(interviewerData);

  const handleSubmit = async (e) => {
    dispatch(otpVerificationStart());
    e.preventDefault();
    await axios
      .post("/api/auth/verify-forgotPassword-otp", { otp, ...data })
      .then((data) => {
        dispatch(otpVerified());
        toast("OTP Verified Successfully");
        navigate("/changePassword");
      })
      .catch((error) => {
        dispatch(otpVerificationError(error.response.data.message));
        console.log(error);
      });
  };

  const [timer, setTimer] = useState(null);

  function countDown() {
    let count = 0;
    for (let i = 30; i >= 0; i--) {
      count++;
      setTimeout(() => {
        setTimer(i);
        count + 1;
      }, count * 1000);
    }
  }

  const resentOTP = async () => {
    await axios
      .post("/api/auth/resent-otp", data)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimer(30);
    countDown();
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-700">
      <h1 className="text-white my-3 font-bold">One-Time Password</h1>
      <div className=" container flex items-center justify-center shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <InputOTP maxLength={6} value={otp} onChange={(otp) => setotp(otp)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {timer ? (
            <h1 className="ml-20 my-3 text-white">Resent OTP in {timer}</h1>
          ) : (
            <h1
              className="ml-20 my-3 text-white cursor-pointer"
              onClick={resentOTP}
            >
              Resent OTP
            </h1>
          )}
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

export default ForgotPasswordOTP;
