// import { Button } from "@/components/ui/button"
import { Button } from "@/components/ui/button";
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
import {
  otpVerificationError,
  otpVerificationStart,
  otpVerified,
} from "@/redux/slices/tempSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

const ForgotPasswordOTP = () => {
  const { error, loading, userRole } = useSelector(
    (state: RootState) => state.temp
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(otpVerificationStart());

    try {
      const response = await axios.post("/api/auth/verify-forgotPassword-otp", {
        otp,
        ...userRole,
      });
      console.log(response.data);
      dispatch(otpVerified());
      toast("OTP Verified Successfully");
      navigate("/changePassword");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        dispatch(otpVerificationError(error?.response?.data?.message));
      } else {
        dispatch(
          otpVerificationError("An error occurred. Please try again later.")
        );
      }
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

  const resentOTP = async () => {
    try {
      const response = await axios.post("/api/auth/resent-otp", userRole);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setTimer(30);
    countDown();
  };

  return (
    <Card className="mx-auto max-w-sm shadow-lg mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Enter the OTP</CardTitle>
        <CardDescription>
          Enter your OTP below to to Reset The Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
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

export default ForgotPasswordOTP;
