import IntervieweeNavbar from "@/components/interviewee/IntervieweeNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IntervieweeHome = () => {
  const navigate = useNavigate();
  const { intervieweeData } = useSelector(
    (state: RootState) => state.interviewee
  );
  const [value, setValue] = useState<string | null>(null);

  const checkLink = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/interviewee/getQuestionSet/${value}`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }, [value]);

  const handleJoinRoom = useCallback(async () => {
    const linkData = await checkLink();
    if (linkData) {
      const { questionSet } = linkData;
      const response = await axios.get(`/api/interviewee/getQAQuestions/${questionSet}`);
      const data = response.data;
      console.log(data, "QA questions data");
  
      const existingInterviewee = data?.attentedInterviewees?.find(
        (attendee: { interviewee: string; result: string }) => attendee.interviewee === intervieweeData?._id
      );
  
      if (existingInterviewee) {
        if (existingInterviewee.result === "Pass") {
          navigate(`/videocall/${value}`);
        } else {
          Swal.fire({
            icon: "error",
            title: "You failed!",
            text: "You failed the contest and cannot join the meeting.",
            confirmButtonText: "OK",
          });
        }
      } else {
        navigate(`/q&a/${questionSet}`);
      }
    } else {
      navigate(`/videocall/${value}`);
    }
  }, [checkLink, navigate, value, intervieweeData?._id]);
  
  return (
    <>
      <IntervieweeNavbar />
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="mt-16 text-center">
          <h1 className="font-serif text-4xl">
            Welcome To Code-Interview Interviewee Home page Here You Can Attend
            Interview and Practice Coding! in Many Languages
          </h1>
        </div>
        <div className="flex ">
          <Input
            className=" w-56"
            placeholder="Put Meeting Lnk here"
            onChange={(e: { target: { value: string } }) =>
              setValue(e.target.value)
            }
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

export default IntervieweeHome;
