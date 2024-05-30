import AddMultiChoiceQuestions from "@/components/interviewer/AddMultiChoiceQuestions";
import InterviewerNavbar from "@/components/interviewer/InterviewerNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";

const InterviewerHome = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string | null>(null);
  const [showAddQuestions, setShowAddQuestions] = useState(false);

  const toggleAddQuestions = () => {
    setShowAddQuestions(!showAddQuestions);
  };

  const handleJoinRoom = useCallback(() => {
    navigate(`/videocall/${value}`);
  }, [navigate, value]);

  return (
    <>
      <InterviewerNavbar />
      <div className="min-h-[90vh] flex flex-col justify-center items-start space-y-12 px-4 relative ">
        <div className="container max-w-[1350px] text-center flex justify-around w-[100vw]  mb-10">
          <div className="w-[40vw]">
            <h1 className="font-bold text-4xl text-gray-800">Welcome To Code-Interview Interviewer Home Page</h1>
            <p className="text-lg mt-4 text-gray-600">
              Attend interviews and practice coding in many languages.
            </p>
          </div>
          <div className="bg-slate-200 h-96 w-80 rounded-lg ml-2">
            <QuestionList />
          </div>
        </div>
        {showAddQuestions && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-2xl z-20">
              <AddMultiChoiceQuestions onClose={toggleAddQuestions} />
            </div>
          </div>
        )}
        <div className="absolute bottom-10 left-0 mb-4  flex w-full justify-around">
          <div className="flex">
            <Input className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" placeholder="Put Meeting Link here" onChange={(e) => setValue(e.target.value)} />
            <Button className="ml-2 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out" onClick={handleJoinRoom}>
              Join Meeting
            </Button>
          </div>

          <div className="flex  ">
            <div className=" mb-4 ml-4">
              <Button className="ml-2 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out" onClick={toggleAddQuestions}>
                Add Questions
              </Button>
            </div>
            <div className=" mb-4 ml-4">
              <Link to={"/compiler"}>
                <Button className="ml-2 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out">
                  Compiler
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewerHome;
