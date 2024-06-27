import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ThirdBG,Light } from "@/lib/Color";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  rightOption: string;
}

interface Data {
  questions: Question[];
}

const QandAsession = () => {
  const { intervieweeData } = useSelector(
    (state: RootState) => state.interviewee
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionsLength, setQuestionLength] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : 600;
  });
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();

  useEffect(() => {
    axios
      .get(`http://13.233.229.71/api/interviewee/getQAQuestions/${questionId}`)
      .then((response) => {
        setData(response.data);
        setQuestionLength(response.data.questions.length);
      })
      .catch(() => {
        toast("Unexpected error Occures");
      });
  }, []);

  useEffect(() => {
    const resetTimer = () => {
      setTimeLeft(600);
    };
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      resetTimer()
    };
  }, [data, questionId]);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
  }, [timeLeft]);

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
        const isAnswerCorrect =
          option === data.questions[currentQuestion].rightOption;
        setIsCorrect(isAnswerCorrect);
        if (isAnswerCorrect) {
          setCorrectCount((prevCount) => prevCount + 1);
        }
      }
    }
  };

  const handleSubmit = async () => {
    await Swal.fire({
      title:
        correctCount >= Math.floor(questionsLength / 2)
          ? "Congratulations!"
          : "You failed!",
      text:
        correctCount >= Math.floor(questionsLength / 2)
          ? "You won the contest and You Can Continue Video Call"
          : `You only answered ${correctCount} questions correctly.`,
      icon:
        correctCount >= Math.floor(questionsLength / 2) ? "success" : "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        handleNavigation();
      }
    });
  };

  const handleNavigation = async () => {
    if (correctCount >= Math.floor(questionsLength / 2)) {
      try {
        await axios.post("http://13.233.229.71/api/interviewee/updateQuestionSet", {
          result: "Pass",
          questionSet: questionId,
          interviewee: intervieweeData?._id,
        });
        const link = await axios.get(
          `http://13.233.229.71/api/interviewee/getMeetingLink/${questionId}`
        );
        navigate(`/videocall/${link?.data?.meetingLink}`);
      } catch (error) {
        toast("Failed to get meeting link");
      }
    } else {
      await axios.post("http://13.233.229.71/api/interviewee/updateQuestionSet", {
        result: "Fail",
        questionSet: questionId,
        interviewee: intervieweeData?._id,
      });
      navigate("/interviewee");
    }
  };

  return (
    <div className="container flex items-center justify-center w-full h-[100vh]"style={{backgroundColor:ThirdBG}} >
      <div className="flex flex-col justify-between shadow-2xl h-[80vh] w-[70vw] rounded-md p-6" style={{backgroundColor:Light}}>
        <div className="text-center">
          <p className="p-3 text-xl font-semibold">
            {`Question ${currentQuestion + 1} of ${data?.questions.length}`}
          </p>
          <p className="p-3 text-lg">
            {data?.questions[currentQuestion]?.question}
          </p>
        </div>

        <div className="container w-[60vw] p-4 rounded-md">
          <div className="grid gap-4">
            {data?.questions[currentQuestion].options.map((option, index) => (
              <Label
              style={{backgroundColor:ThirdBG}}
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
        <div className="text-center mt-4">
          <p className="text-lg font-semibold">{`Time left: ${Math.floor(
            timeLeft / 60
          )}:${timeLeft % 60 < 10 ? "0" : ""}${timeLeft % 60}`}</p>
        </div>
      </div>
    </div>
  );
};

export default QandAsession;
