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
import {
  signupError,
  signupStart,
  signupSuccess,
} from "@/redux/slices/companySlice";
import { setUserRole } from "@/redux/slices/tempSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";
import axiosInstance from "../../intersepters/axiosBackendIntersepter";

const CompanySignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.company);

  const [formData, setFormData] = useState<CompanySignUp>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupStart());
    try {
      await axiosInstance.post("/api/auth/signup", { ...formData, role: "company" }).then(()=>{
        dispatch(signupSuccess());
        toast("OTP Sent to the Registered E-mail");
        dispatch(setUserRole({role:"company",email:formData.email}))
        navigate("/otp");
      })
    } catch (error) {
      if(axios.isAxiosError(error)){
        dispatch(signupError(error?.response?.data));
      }else
      {
        dispatch(signupError("Signup Failed"));
      }
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
    <Card className="mx-auto max-w-sm  mt-10 w-96 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Company SignUp</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit}>
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

            <Button type="submit" className="w-full mt-3">
            {loading ? <ScaleLoader color="white" /> : "Create an Account"}
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/company/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySignup;

interface CompanySignUp {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
