import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React  from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/google/authentication";
import {toast} from "sonner"

const IntervieweeSignup = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider).then((data) => {
      toast("Account Created Successfully")
      localStorage.setItem("email", data.user.email);
      navigate("/interviewee");
    });
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-700 flex items-center justify-center">
        <form>
          <div className="container h-1/2 flex flex-col bg-transparent shadow-2xl rounded-lg items-center gap-5 ">
            <h1 className="font-extrabold text-lg mt-10 text-white">
              Interviewee SignUp
            </h1>
            <Input className="w-72 mt-2" placeholder="Enter Your Userame" />
            <Input className="w-72 mt-2" placeholder="Enter Your  E-Mail" />
            <Input className="w-72 mt-2" placeholder="Enter Password" />
            <Input className="w-72 mt-2" placeholder="Confirm Password" />
            <Button className="w-24 mt-5">SignUp</Button>
            <h1>OR</h1>
            <Button className="mb-5" onClick={handleClick}>
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
