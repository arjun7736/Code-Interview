import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/google/authentication";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  loginError,
  loginStart,
  loginSuccess,
} from "@/redux/slices/intervieweeSlice";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

const IntervieweeLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({});

  useEffect(() => {
    const intervieweeData = localStorage.getItem("interviewee_token");
    if (!intervieweeData) {
      navigate("/interviewee/login");
    } else {
      navigate("/interviewee");
    }
  }, []);

  const { error, loading, intervieweeData } = useSelector(
    (state) => state.interviewee
  );

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await signInWithPopup(auth, provider);
    toast("Login Successfully");
    const IntervieweeData = JSON.stringify(result.user.providerData[0]);
    localStorage.setItem("interviewee_token", IntervieweeData);
    navigate("/interviewee");

    const response = await axios
      .post("/api/auth/google-signin", result.user.providerData[0])
      .then((data) => {
        console.log(data);
      }).catch((error)=>{
        console.log(error);
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      axios
        .post("/api/auth/interviewee-login", formData)
        .then((data) => {
          dispatch(loginSuccess(data.data));
          const IntervieweeData = JSON.stringify(data.data);
          localStorage.setItem("interviewee_token", IntervieweeData);
          navigate("/interviewee");
        })
        .catch((error) => {
          dispatch(loginError(error.response.data.message));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg">
            <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">
              Interviewee Login
            </h1>
            <Input
              type="email"
              label="Email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              name="email"
              id="email"
            />
            <Input
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              label="Password"
              placeholder="Enter Your Password"
            />
            <p className="text-red-500 font-serif">{error ? error : ""}</p>

            <Button className="w-28 mt-5" type="submit" disabled={loading}>
              {loading ? <ScaleLoader color="white" /> : "Login"}
            </Button>
            <h1
              className=" ml-32 text-blue-100 cursor-pointer "
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password ?
            </h1>
            <div className="bg-black h-0.5 min-w-full"></div>
            <Button onClick={handleClick}>
              <FcGoogle className="mx-3" /> Login With Google
            </Button>
            <Link to="/interviewee/signup">
              <h1 className="ml-32 text-blue-100 cursor-pointer mb-3 ">
                Don't Have an Account ?
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default IntervieweeLogin;
