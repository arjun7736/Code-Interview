import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface Question {
  question: string;
  options: string[];
  rightOption: string;
}

interface Data {
  questions: Question[];
}

const QandAsession = () => {
  const {intervieweeData}=useSelector((state:RootState)=>state.interviewee)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const navigate = useNavigate(); 

  const { questionId } = useParams<{ questionId: string }>();



  useEffect(() => {
    axios
      .get(`/api/interviewee/getQAQuestions/${questionId}`)
      .then((response) => {       
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < (data?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleOptionChange = (option: string) => {
    if (!selectedOption) {
      setSelectedOption(option);
      if (data) {
        const isAnswerCorrect = option === data.questions[currentQuestion].rightOption;
        setIsCorrect(isAnswerCorrect);
        if (isAnswerCorrect) {
          setCorrectCount((prevCount) => prevCount + 1);
        }
      }
    }
  };
 
  const handleSubmit = async () => {
    const questionsLength = data?.questions?.length ?? 0;
    Swal.fire({
      title: correctCount >= Math.floor(questionsLength / 2) ? "Congratulations!" : "You failed!",
      text: correctCount >= Math.floor(questionsLength / 2)
        ? "You won the contest and You Can Continue Video Call"
        : `You only answered ${correctCount} questions correctly.`,
      icon: correctCount >= Math.floor(questionsLength / 2) ? "success" : "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        handleNavigation();
      }
    });
  };
  
  const handleNavigation = async () => {
    const questionsLength = data?.questions?.length ?? 0; 
  
    if (correctCount >= Math.floor(questionsLength / 2)) {
      try {
       const data = await axios.post("/api/interviewee/updateQuestionSet",{result:"Pass",questionSet:questionId,interviewee:intervieweeData?._id})
       console.log(data)
        const link = await axios.get(`/api/interviewee/getMeetingLink/${questionId}`);
        navigate(`/videocall/${link?.data?.meetingLink}`);
      } catch (error) {
        console.error("Failed to get meeting link", error);
      }
    } else {
      await axios.post("/api/interviewee/updateQuestionSet",{result:"Fail",questionSet:questionId,interviewee:intervieweeData?._id})
      navigate('/interviewee');
    }
  };
  return (
    <div className="container flex items-center justify-center w-full h-[100vh] bg-gray-100">
      <div className="flex flex-col justify-between shadow-2xl bg-blue-300 h-[80vh] w-[70vw] rounded-md p-6">
        <div className="text-center">
          <p className="p-3 text-xl font-semibold">
            {`Question ${currentQuestion + 1} of ${data?.questions.length}`}
          </p>
          <p className="p-3 text-lg">
            {data?.questions[currentQuestion]?.question}
          </p>
        </div>

        <div className="container w-[60vw] bg-blue-300 p-4 rounded-md">
          <div className="grid gap-4">
            {data?.questions[currentQuestion].options.map((option, index) => (
              <Label
                key={index}
                className={`flex items-center justify-center p-3 rounded-md cursor-pointer border-2 ${
                  selectedOption === option
                    ? isCorrect
                      ? "border-green-500 shadow-2xl"
                      : "border-red-500 shadow-2xl"
                    : "border-transparent"
                } bg-white hover:shadow-md transition-shadow`}
                onClick={() => handleOptionChange(option)}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  className="hidden"
                  disabled={selectedOption !== null}
                />
                <span className="text-lg">{option}</span>
              </Label>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {currentQuestion === (data?.questions.length || 0) - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QandAsession;
