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
import { AdminState } from "@/interface/userStateInterface";
import {
  loginError,
  loginStart,
  loginSuccess,
} from "@/redux/slices/adminSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { error, loading } = useSelector(
    (state: RootState) => state.admin as AdminState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post("http://13.233.229.71/api/auth/login", {
        ...formData,
        role: "admin",
      });
      if (response.data) {
        dispatch(loginSuccess(response.data.user));
        const token =response.data.admin_token
        Cookies.set('admin_token', token, { expires: new Date(Date.now() + 3600000), secure: false, sameSite: 'Lax' });
        navigate("/admin/dashboard");
      } else {
        dispatch(loginError("An error occurred during login"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        dispatch(loginError(error.response.data));
      } else {
        dispatch(loginError("An error occurred during login"));
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
    <div >
      <Card className={`mx-auto max-w-sm shadow-lg mt-20 `}>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
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
                </div>
                <Input id="password" type="password" onChange={handleChange} />
              </div>
              <p className="text-red-500 font-serif">{error ? error : ""}</p>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                data-testid="login"
              >
                {loading ? <ScaleLoader color="white" /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

interface LoginFormData {
  email: string;
  password: string;
}
