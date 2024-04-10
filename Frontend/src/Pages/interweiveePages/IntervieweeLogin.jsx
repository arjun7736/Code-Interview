import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link,useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/google/authentication";
import {toast} from "sonner"

const IntervieweeLogin = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider).then((data) => {
      toast("Login Successfully")
      localStorage.setItem("email", data.user.email);
      navigate("/interviewee");
    });
  };

  return (
    <>
 <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg" >
            <h1 className="font-extrabold text-2xl mt-10 text-white font-serif">Interviewee Login</h1>
            <Input  className="w-72 mt-2" placeholder="Enter Your Email"/>
            <Input className="w-72 mt-2" placeholder="Enter Your Password"/>
            <Button className="w-24 mt-5">Login</Button>
            <h1 className=" ml-32 text-blue-100 cursor-pointer ">Forgot Password ?</h1>
            <div className="bg-black h-0.5 min-w-full"></div>
            {/* <h1 className="text-white">OR</h1> */}
            <Button onClick={handleClick}><FcGoogle className="mx-3"/> Login With Google</Button>
            <Link to="/interviewee/signup"><h1 className="ml-32 text-blue-100 cursor-pointer mb-3 ">Don't Have an Account ?</h1></Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default IntervieweeLogin