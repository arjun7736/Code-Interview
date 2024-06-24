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
import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePassword = () => {
const{userRole}=useSelector((state:RootState)=>state.temp)
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForgotPasswordData>({password:"",confirmpassword:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.patch("/api/auth/changePassword", { ...formData, ...userRole });
      console.log(response.data);
      toast("Password Reset Successfully");
      navigate("/")
      } catch (error) {
      console.error(error);
    }
  };


  return (
    <Card className="mx-auto max-w-sm shadow-lg mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Change Password</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Password">Password</Label>
              <Input id="password" type="password"  onChange={handleChange}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm password">Confirm Password</Label>
              <Input id="confirmpassword" type="password"  onChange={handleChange}/>
            </div>
            <Button
              type="submit"
              className="w-full"
              // disabled={loading}
            >
              {/* {loading ? <ScaleLoader  color="white"/> : "Login"} */}
change Password
            </Button>
            {/* <p className="text-red-500 font-serif">{error ? error : ""}</p> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;

interface ForgotPasswordData{
  password:string,
  confirmpassword:string
}