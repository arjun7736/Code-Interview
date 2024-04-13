import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginError,
  loginStart,
  loginSuccess,
} from "@/redux/slices/interviewerSlice";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

const InterviewerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({});
  const { error, loading } = useSelector((state) => state.interviewer);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      axios
        .post("/api/auth/interviewer-login", formData)
        .then((data) => {
          dispatch(loginSuccess(data.data));
          const InterviewerData = JSON.stringify(data.data);
          localStorage.setItem("interviewer_token", InterviewerData);
          navigate("/interviewer");
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
              Interviewer Login
            </h1>
            <Input
              onChange={handleChange}
              className="w-72 mt-2"
              placeholder="Enter Your Email"
              type="email"
              name="email"
              id="email"
              label="Email"
            />
            <Input
              onChange={handleChange}
              className="w-72 mt-2"
              placeholder="Enter Your Password"
              type="password"
              name="password"
              id="password"
              label="Password"
            />
            <p className="text-red-500 font-serif">{error ? error : ""}</p>
            <Button className="w-24 my-5" type="submit" disabled={loading}>
              {loading ? <ScaleLoader color="white" /> : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewerLogin;
