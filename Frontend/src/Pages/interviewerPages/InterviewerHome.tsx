import InterviewerNavbar from "@/components/interviewer/InterviewerNavbar";
import { Button } from "@/components/ui/button";

const InterviewerHome = () => {
  return (
    <>
      <InterviewerNavbar />
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="mt-16 text-center">
          <h1 className="font-serif text-4xl">
            Welcome To Code-Interview Interviewer Home page Here You Can Attend Interview and Practice
            Coding! in Many Languages
          </h1>
        </div>
        <div className="flex ">
          <Button className="mx-2 ">
            {" "}
            Create Meeting{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default InterviewerHome;
