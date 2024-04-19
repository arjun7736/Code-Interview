import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/google/authentication";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  signupError,
  signupStart,
  signupSuccess,
} from "@/redux/slices/intervieweeSlice";
import { ScaleLoader } from "react-spinners";

const IntervieweeSignup = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.interviewee);
  const [formData, setformData] = useState({});

  // useEffect(() => {
  //   const interviewerData = localStorage.getItem("interviewee_token");
  //   if (!interviewerData) navigate("/interviewee/signup");
  //   else navigate("/interviewee")
  // }, []);

  const navigate = useNavigate();
  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((data) => {
      toast("Account Created Successfully");
      localStorage.setItem("email", data.user.email);
      navigate("/interviewee");
    });
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    dispatch(signupStart());
    e.preventDefault();
    await axios
      .post("/api/auth/interviewee-signup", formData)
      .then((data) => {
        dispatch(signupSuccess(data.data));
        const IntervieweeData = JSON.stringify(data.data);
        localStorage.setItem("interviewee_token", IntervieweeData);
        toast("OTP Sent to the Registered E-mail");
        navigate("/otp");
      })
      .catch((error) => {
        dispatch(signupError(error.response.data.message));
      });
  };
  return (
    <>
      <div className="w-full h-screen bg-gray-700 flex items-center justify-center">
        <form onSubmit={handleClick}>
          <div className="container h-1/2 flex flex-col bg-transparent shadow-2xl rounded-lg items-center gap-5 ">
            <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">
              Interviewee SignUp
            </h1>
            <Input
              onChange={handleChange}
              type="nanme"
              label="Username"
              id="name"
              placeholder="Enter Your Userame"
            />
            <Input
              onChange={handleChange}
              type="email"
              id="email"
              label="Email"
              placeholder="Enter Your  E-Mail"
            />
            <Input
              onChange={handleChange}
              type="password"
              label="Password"
              id="password"
              placeholder="Enter Password"
            />
            <Input
              onChange={handleChange}
              type="password"
              id="confirmpassword"
              label="Confirm Paasword"
              placeholder="Confirm Password"
            />
            <p className="text-red-500 font-serif">{error ? error : ""}</p>

            <Button className="w-24 mt-5" type="submit" disabled={loading}>
              {loading ? <ScaleLoader color="white" /> : "Signup"}
            </Button>
            <div className="bg-black h-0.5 min-w-full"></div>
            <Button className="mb-5" onClick={handleGoogle}>
              <FcGoogle className="mx-3" /> SignUp With Google
            </Button>
            <Link to="/interviewee/login">
              <h1 className="ml-32 text-blue-100 cursor-pointer mb-2">
                Already Have an Account ?
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default IntervieweeSignup;
