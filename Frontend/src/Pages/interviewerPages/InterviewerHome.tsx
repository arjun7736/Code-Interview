import InterviewerNavbar from "@/components/interviewer/InterviewerNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "../../components/interviewer/QuestionList";
import AddMultiChoiceQuestions from "@/components/interviewer/AddMultiChoiceQuestions";
import { toast } from "sonner";
import IndividualQuestionTable from "@/components/interviewer/IndividualQuestionTable";
import { interviewersQuestions } from "@/redux/slices/tempSlice";
import { useDispatch, useSelector } from "react-redux";
import { Light, MainBackGround, ThirdBG } from "@/lib/Color";
import { RootState } from "@/redux/store";
import axiosInstance from "../../intersepters/axiosBackendIntersepter";

export interface Question {
  questionSet: string;
  questions: [
    {
      question: string;
      options: string[];
      rightOption: string;
    }
  ];
  author: string;
  attentedInterviewees: [
    {
      interviewee: string;
      result: string;
      date: Date;
    }
  ];
}
const InterviewerHome = () => {
  const {interviewerData}=useSelector((state:RootState)=>state.interviewer)
  const [selectedQuestionSet, SetSelectQuestionSet] = useState<
    Question[] | null
  >(null);
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedQuestionSetId, setSelectedQuestionSetId] = useState<
    string | null
  >(null);
  const [value, setValue] = useState<string | null>(null);
  const [showSelectQuestionModal, setShowSelectQuestionModal] = useState(false);
  const [showAddQuestions, setShowAddQuestions] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance
      .get(`/api/interviewer/getQuestions/${interviewerData?._id}`)
      .then((response) => {
        setQuestionSets(response.data);
        dispatch(interviewersQuestions(response?.data));
      })
      .catch(() => {
        toast("Unexpected  error Occures");
      });
  }, [selectedQuestionSet, dispatch, showAddQuestions]);

  const handleJoinRoom = useCallback(() => {
    setShowSelectQuestionModal(true);
  }, []);

  const handleQuestionSetChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuestionSetId(event.target.value);
  };

  const handleProceed = useCallback(
    async (selectedQuestionSetId: string | null) => {
      setShowSelectQuestionModal(false);
      if (value) {
        const data = await axiosInstance.post("/api/interviewer/setMeetingLink", {
          link: value,
          questionSet: selectedQuestionSetId,
        });
        toast(data.data.Message);
        navigate(`/videocall/${value}`);
      }
    },
    [navigate, value]
  );

  const toggleAddQuestions = () => {
    setShowAddQuestions(!showAddQuestions);
  };

  return (
    <>
      <InterviewerNavbar />
      <div
        className="min-h-[90vh] flex flex-col justify-center items-start space-y-12 px-4 relative"
        style={{ backgroundColor: ThirdBG }}
      >
        <div className="container max-w-[1350px] text-center flex justify-around w-[100vw] mb-10">
          <div className="w-[40vw]">
            {selectedQuestionSet ? (
              <IndividualQuestionTable
                questionsData={selectedQuestionSet}
                select={SetSelectQuestionSet}
              />
            ) : (
              <>
                <h1 className="font-bold text-4xl text-gray-800">
                  Welcome To Code-Interview Interviewer Home Page
                </h1>
                <p className="text-lg mt-4 text-gray-600">
                  Attend interviews and practice coding in many languages.
                </p>
              </>
            )}
          </div>
          <div
            className="h-96 w-80 rounded-lg ml-2"
            style={{ backgroundColor: Light }}
          >
            <QuestionList select={SetSelectQuestionSet} />
          </div>
        </div>

        {showSelectQuestionModal && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-2xl z-20">
              <h2 className="text-2xl font-bold mb-4">Select Question Set</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="questionSet"
                >
                  Select a Question Set
                </label>
                <select
                  id="questionSet"
                  value={selectedQuestionSetId || ""}
                  onChange={handleQuestionSetChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select a question set
                  </option>
                  {questionSets.map((set: QuestionSet) => (
                    <option
                      key={set.questionSet}
                      value={set.questionSet}
                      className="text-black"
                    >
                      QuestionSet {set.questionSet}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-between gap-10">
                <Button
                  onClick={() => handleProceed(selectedQuestionSetId)}
                  style={{ backgroundColor: MainBackGround }}
                >
                  Done & Join Meeting
                </Button>
                <Button
                  onClick={() => handleProceed(null)}
                  style={{ backgroundColor: MainBackGround }}
                >
                  Continue Without Questions
                </Button>
              </div>
            </div>
          </div>
        )}

        {showAddQuestions && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-2xl z-20">
              <AddMultiChoiceQuestions onClose={toggleAddQuestions} />
            </div>
          </div>
        )}
        <div className="absolute bottom-10 left-0 mb-4 flex w-full justify-around">
          <div className="flex">
            <Input
              className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Put Meeting Link here"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              style={{ backgroundColor: MainBackGround }}
              className="ml-2 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out"
              onClick={handleJoinRoom}
            >
              Join Meeting
            </Button>
          </div>

          <div className="flex">
            <div className="mb-4 ml-4">
              <Button
                style={{ backgroundColor: MainBackGround }}
                className="ml-2 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out"
                onClick={() => setShowAddQuestions(true)}
              >
                Add Questions
              </Button>
            </div>
            <div className="mb-4 ml-4">
              <Link to={"/compiler"}>
                <Button
                  className="ml-2 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-150 ease-in-out"
                  style={{ backgroundColor: MainBackGround }}
                >
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
interface QuestionSet {
  questionSet: string;
}
