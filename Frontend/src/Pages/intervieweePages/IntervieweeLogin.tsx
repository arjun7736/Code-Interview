import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   UserCredential, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { auth, provider } from "@/google/authentication";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  loginError,
  loginStart,
  loginSuccess,
} from "@/redux/slices/intervieweeSlice";
import { ScaleLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store";





interface FormState {
  email: string;
  password: string;
}

const IntervieweeLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const { error, loading } = useSelector(
    (state: RootState) => state.interviewee
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const response = await axios.post(
        "/api/auth/google-signin",
        result.user.providerData[0]
      );
      toast("Login Successfully");
      navigate("/interviewee");
      dispatch(loginSuccess(response.data));
    } catch (error) {
      toast("Unexpected error Occures");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post("/api/auth/login", {
        ...formData,
        role: "interviewee",
      });
      dispatch(loginSuccess(response.data));
      navigate("/interviewee");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(loginError(error?.response?.data));
      }
    }
  };
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        dispatch(loginError(""));
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error, dispatch]);

  return (
    <Card className="mx-auto max-w-sm shadow-lg mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Interviewee Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={handleChange} id="email" type="email" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgotPassword" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" onChange={handleChange} />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? <ScaleLoader  color="white"/> : "Login"}
          </Button>
          <p className="text-red-500 font-serif">{error ? error : ""}</p>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="mx-3" />
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/interviewee/signup" className="underline">
            Sign up
          </Link>
        </div>
          </form>
      </CardContent>
    </Card>
  );
};

export default IntervieweeLogin;
