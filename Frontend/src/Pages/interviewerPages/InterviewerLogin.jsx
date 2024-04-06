import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const InterviewerLogin = () => {
  return (
    <>
      <div className="w-full h-screen flex bg-gray-700 items-center justify-center ">
        <form>
          <div className=" container flex flex-col items-center gap-5 bg-transparent shadow-2xl rounded-lg">
            <h1 className="font-extrabold text-lg mt-10 text-white ">
              Interviewer Login
            </h1>
            <Input className="w-72 mt-2" placeholder="Enter Your Email" />
            <Input className="w-72 mt-2" placeholder="Enter Your Password" />
            <Button className="w-24 my-5">Login</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewerLogin;
