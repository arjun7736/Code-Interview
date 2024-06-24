import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, provider } from "@/google/authentication";
import {
  loginSuccess,
  signupError,
  signupStart,
  signupSuccess,
} from "@/redux/slices/intervieweeSlice";
import { setUserRole } from "@/redux/slices/tempSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import {  UserCredential, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

const IntervieweeSignup = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(
    (state: RootState) => state.interviewee
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState<intervieweeSignup>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupStart());
    try {
       await axios.post("http://13.235.95.144/api/auth/signup", {
        ...formData,
        role: "interviewee",
      });
      dispatch(signupSuccess());
      toast("OTP Sent to the Registered E-mail");
      dispatch(setUserRole({role:"interviewee",email:formData.email}))
      navigate("/otp");
    } catch (error) {
      if(axios.isAxiosError(error)){
        dispatch(signupError(error?.response?.data));
      }else{
        dispatch(signupError("Signup Failed"));
      }
    }
  };

  const handleGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const response = await axios.post(
        "http://13.235.95.144/api/auth/google-signin",
        result.user.providerData[0]
      );
      toast("Login Successfully");
      navigate("/interviewee");
      dispatch(loginSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        dispatch(signupError(""));
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="mx-auto max-w-sm  mt-10 w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Interviewee Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleClick}>
          <div className="grid gap-4">
            <div className="grid  gap-2">
              <div className="grid gap-2">
                <Label htmlFor="name"> Name</Label>
                <Input id="name" type="username" onChange={handleChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                id="confirmpassword"
                type="password"
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 font-serif">{error ? error : ""}</p>
            <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <ScaleLoader color="white" /> : "Create an account"}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogle}>
              <FcGoogle className="mx-3" />
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/interviewee/login" className="underline">
              Log in
            </Link>
          </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default IntervieweeSignup;

interface intervieweeSignup {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
