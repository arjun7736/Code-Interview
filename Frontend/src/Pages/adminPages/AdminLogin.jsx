import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { loginError, loginStart, loginSuccess } from "@/redux/slices/adminSlice";




const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({});
    const dispatch =useDispatch()
    const {error,loading,adminData}=useSelector((state)=>state.admin)
    const handleChange = (e) => {
      setformData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit =  (e) => {
      e.preventDefault();
      dispatch(loginStart())
      try {
         axios
         .post("/api/auth/login", {...formData,role:"admin"})
          .then((data) => {
            dispatch(loginSuccess(data.data))
            const AdminData = JSON.stringify(data.data);
            localStorage.setItem('admin_token', AdminData);
            navigate("/admin/dashboard")
          })
          .catch((error) => {
            dispatch(loginError(error.response.data))
          });
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg">
            <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">
              Admin Login
            </h1>
            <Input
              onChange={handleChange}
              className="w-72 mt-2"
              placeholder="Enter Your Email"
              type ="email"
              name="email"
              id="email"
            />
            <Input
              onChange={handleChange}
              className="w-72 mt-2"
              placeholder="Enter Your Password"
              type ="password"
              name="password"
              id="password"
            />
            <p className="text-red-500 font-serif">{error?error:''}</p>
            <Button className="w-36 my-5" type="submit" disabled={loading}>
              {loading?<ScaleLoader color="white" />: "Login"}
            </Button>
          </div>
        </form>
      </div>
  )
}

export default AdminLogin