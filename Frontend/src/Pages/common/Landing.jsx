import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const adminData = localStorage.getItem("admin_token");
  const interviewerData = localStorage.getItem("interviewer_token");
  const intervieweeData = localStorage.getItem("interviewee_token");
  const companyData = localStorage.getItem("company_token");

  useEffect(() => {
    if (intervieweeData) {
      navigate("/interviewee");
    } else if (companyData) {
      navigate("/company");
    } else if (adminData) {
      navigate("/admin");
    } else if (interviewerData) {
      navigate("/interviewer");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <NavBar />
      <div className="mt-16 text-center">
        <h1 className="font-serif text-4xl">
          Welcome To Code-Interview Here You Can Attend Interview and Practice
          Coding! in Many Languages
        </h1>
      </div>
      <div className="flex absolute bottom-20 lg:left-10 md:left-2">
        <Input className=" w-56" placeholder="Put Meeting Lnk here" />
        <Button className="mx-2 ">
          {" "}
          <RiVideoAddFill className="mx-1" />
          Join Meeting{" "}
        </Button>
      </div>
    </div>
  );
};

export default Landing;
