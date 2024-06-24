/* eslint-disable react-refresh/only-export-components */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  otpVerificationError,
  otpVerificationStart,
  otpVerified,
} from "@/redux/slices/tempSlice";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

const OTP = () => {
  const { error, loading, userRole } = useSelector(
    (state: RootState) => state.temp
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setotp] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(otpVerificationStart());
    try {
      await axios
        .post("http://13.235.95.144/api/auth/verify-otp", {
          otp,
          ...userRole,
        })
        .then(() => {
          dispatch(otpVerified());
          toast("OTP Verified Successfully");
          if (userRole?.role === "interviewer") {
            navigate(-1);
          } else {
            navigate(`/${userRole?.role}/login`);
          }
        })
        .catch((error) => {
          dispatch(otpVerificationError(error?.response?.data));
        });
      
    } catch (error) {
        dispatch(
          otpVerificationError("An error occurred. Please try again later.")
        );
      console.error(error);
    }
  };

  const [timer, setTimer] = useState<number | null>(null);

  function countDown() {
    let count = 0;
    for (let i = 30; i >= 0; i--) {
      count++;
      setTimeout(() => {
        setTimer(i);
      }, count * 1000);
    }
  }

  // const resentOTP = async () => {
  //   try {
  //    await axios.post("/api/auth/resent-otp", userRole).then((data)=>{
  //     console.log(data)
  //      toast("OTP Resent To the Mail ID");
  //    })
  //   } catch (error) {
  //     console.log(error)
  //     dispatch(otpVerificationError(error.response.data));
  //   }
  //   setTimer(30);
  //   countDown();
  // };
  const resentOTP = async () => {
    try {
      await axios.post("http://13.235.95.144/api/auth/resent-otp", userRole).then((data) => {
        console.log(data);
        toast("OTP Resent To the Mail ID");
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        dispatch(otpVerificationError(error.response?.data));
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
    setTimer(30);
    countDown();
  };
  return (
    <Card className="mx-auto max-w-sm shadow-lg mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Enter the OTP</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <InputOTP maxLength={6} value={otp} onChange={(otp) => setotp(otp)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {timer ? (
            <h1 className="ml-28 my-3 text-black">Resent OTP in {timer}</h1>
          ) : (
            <h1
              className="ml-32 my-3 text-black cursor-pointer"
              onClick={resentOTP}
            >
              Resent OTP
            </h1>
          )}
          <p className="text-red-500 font-serif">{error ? error : ""}</p>
          {
            <Button className="ml-28 mb-5 w-28" type="submit">
              {loading ? (
                <ScaleLoader color="white" height={20} />
              ) : (
                "Submit OTP"
              )}
            </Button>
          }
        </form>
      </CardContent>
    </Card>
  );
};

export default OTP;

