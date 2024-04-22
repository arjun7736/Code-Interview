import InterviewerNavbar from "@/components/interviewer/InterviewerNavbar";
import { Button } from "@/components/ui/button";
import React from "react";
import { RiVideoAddFill } from "react-icons/ri";

const InterviewerHome = () => {
  return (
    <>
      <InterviewerNavbar />
      <div className="flex absolute bottom-20 lg:left-10 md:left-2">
        <Button className="mx-2 ">
          {" "}
          <RiVideoAddFill className="mx-1" />
          Create Meeting{" "}
        </Button>
      </div>
    </>
  );
};

export default InterviewerHome;
