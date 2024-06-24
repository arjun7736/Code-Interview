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
import { loginError, loginStart, loginSuccess } from "@/redux/slices/interviewerSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const InterviewerLogin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.interviewer);

  const [formData, setFormData] = useState<InterviewerLogin>({email:"",password:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
     await axios.post("http://13.235.95.144/api/auth/login", { ...formData, role: "interviewer" }).then((data)=>{
       dispatch(loginSuccess(data.data));
       navigate("/interviewer");
     })
    } catch (error) {
      if(axios.isAxiosError(error)){
        dispatch(loginError(error?.response?.data || "Login Failed"));
      }else{
        dispatch(loginError("Login Failed"));
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
        <CardTitle className="text-2xl">Interviewer Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input  id="email" type="email" onChange={handleChange}/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgotPassword"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" onChange={handleChange} />
            </div>
            <p className="text-red-500 font-serif">{error ? error : ""}</p>
            <Button type="submit" className="w-full" >
              {loading ? <ScaleLoader color="white" /> : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>  )
}

export default InterviewerLogin


interface InterviewerLogin{
  email:string,
  password:string
}