import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const IntervieweeLogin = () => {
  return (
    <>
 <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg" >
            <h1 className="font-extrabold text-lg mt-10 text-white ">Interviewee Login</h1>
            <Input  className="w-72 mt-2" placeholder="Enter Your Email"/>
            <Input className="w-72 mt-2" placeholder="Enter Your Password"/>
            <Button className="w-24 mt-5">Login</Button>
            <h1>OR</h1>
            <Button className="mb-5"><FcGoogle className="mx-3"/> Login With Google</Button>
            <Link to="/interviewee-signup"><h1 className="ml-32 text-blue-100 cursor-pointer mb-2">Don't Have an Account ?</h1></Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default IntervieweeLogin