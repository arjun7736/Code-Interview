import InterviewerNavbar from "@/components/interviewer/InterviewerNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { RiVideoAddFill } from "react-icons/ri";

const InterviewerHome = () => {
  return (
    <>
      <InterviewerNavbar />
      <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="mt-16 text-center">
        <h1 className="font-serif text-4xl">
          Welcome To Code-Interview Interviewer Home page Here You Can Conduct Interview and Test interviewers Skills
        </h1>
      </div>
      <div className="flex absolute bottom-20 lg:left-10 md:left-2">
        <Button className="mx-2 ">
          {" "}
          <RiVideoAddFill className="mx-1" />
          Create Meeting{" "}
        </Button>
      </div>
    </div>
    </>
  );
};

export default InterviewerHome;
