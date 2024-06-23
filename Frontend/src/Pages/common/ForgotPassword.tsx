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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/redux/slices/tempSlice";

const ForgotPassword = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios
        .post("http://13.201.15.170/api/auth/forgotPassword", formData)
        .then((data) => {
          console.log(data);
          dispatch(setUserRole({ role: formData.role, email: formData.email }));
          navigate("/forgotPassword-otp");
          toast("OTP Sent To the E-Mail");
        })
        .catch((error) => {
          console.log(error);
          if (axios.isAxiosError(error)) {
            console.log(error);
            setError(error?.response?.data);
          } else {
            setError('An unexpected error occurred');
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error?.response?.data?.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm shadow-lg mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to Find your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter Your E-Mail " onChange={handleChange}/>
            </div>
            <select
              value={formData.role}
              onChange={handleRoleChange}
              className="w-full h-10 border-gray-300 rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Select Your Role
              </option>
              <option value="company">Company</option>
              <option value="interviewee">Interviewee</option>
            </select>
            <Button
              type="submit"
              className="w-full"
              // disabled={loading}
            >
               sent OTP
            </Button>
            <p className="text-red-500 font-serif">{error ? error : ""}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;

interface ForgotPasswordData {
  email: string;
  role: string;
}
