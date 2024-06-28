import IntervieweeNavbar from "@/components/interviewee/IntervieweeNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainBackGround, ThirdBG } from "@/lib/Color";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
      toast("Unexpected error Occured");
    }
  }, [value]);

  const handleJoinRoom = useCallback(async () => {
    const linkData = await checkLink();
    if (linkData) {
      const { questionSet } = linkData;
      if (!questionSet) {
        navigate(`/videocall/${value}`);
      }
      const response = await axios.get(
        `/api/interviewee/getQAQuestions/${questionSet}`
      );
      const data = response.data;

      const existingInterviewee = data?.attentedInterviewees?.find(
        (attendee: { interviewee: string; result: string }) =>
          attendee.interviewee === intervieweeData?._id
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useMemo(() => [
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_video_call_re_4p26.svg?alt=media&token=df00cf93-4407-40ec-aeb5-bcd19ded9307",
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_programming_re_kg9v.svg?alt=media&token=e9b54b70-edd6-4c80-b8a7-db1f5957ce34",
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_group_video_re_btu7.svg?alt=media&token=8c923bc1-74d2-4e22-afad-44db51ad9e87",
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_code_thinking_re_gka2.svg?alt=media&token=59c826f0-0fe9-4937-9279-b306103e8aa6"
  ], []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <>
      <IntervieweeNavbar />
      <div
        className="min-h-[90vh] w-full flex justify-center items-center"
        style={{ backgroundColor: ThirdBG }}
      >
        <div className='w-2/4 flex flex-col'>
          <div className="mt-16 text-left">
            <h1 className="font-serif text-4xl">
              Welcome To Code-Interview
            </h1>
            <p>Here You Can Attend Interview and Practice Coding! in Many Languages.</p>
          </div>
          <div className="flex mt-10 ">
            <Input
              className=" w-56"
              placeholder="Put Meeting Link here"
              onChange={(e: { target: { value: string } }) =>
                setValue(e.target.value)
              }
            />
            <Button
              className="mx-2 "
              onClick={handleJoinRoom}
              style={{ backgroundColor: MainBackGround }}
            >
              {" "}
              Join Meeting{" "}
            </Button>
          </div>
        </div>
        <div className="w-[40vw]">
          <img src={images[currentImageIndex]} alt="" className="" />
        </div>
      </div>
    </>
  );
};

export default IntervieweeHome;
