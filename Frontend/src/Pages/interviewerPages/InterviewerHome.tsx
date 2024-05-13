import InterviewerNavbar from "@/components/interviewer/InterviewerNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const InterviewerHome = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string | null>(null);
  
  const handleJoinRoom =useCallback(() => {
    navigate(`/videocall/${value}`);
  },[navigate,value])


  return (

    <>
      <InterviewerNavbar />
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="mt-16 text-center">
          <h1 className="font-serif text-4xl">
            Welcome To Code-Interview Interviewer Home page Here You Can Attend
            Interview and Practice Coding! in Many Languages
          </h1>
        </div>
        <div className="flex ">
          <Input
            className=" w-56"
            placeholder="Put Meeting Lnk here"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="mx-2 " onClick={handleJoinRoom}>
            {" "}
            Join Meeting{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default InterviewerHome;
