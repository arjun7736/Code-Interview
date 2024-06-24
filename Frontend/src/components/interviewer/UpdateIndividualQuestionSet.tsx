import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";

interface MultiChoiceProps {
  onClose: any,
  data: {
    question: string;
    options: string[];
    rightOption: string;
    _id?: string;
  };
  select: (value: null | []) => void; 
}

const UpdateIndividualQuestionSet: React.FC<MultiChoiceProps> = ({
  onClose,
  data,
  select
}) => {
  const [question, setQuestion] = useState(data.question);
  const [options, setOptions] = useState(data.options);
  const [rightOption, setSelectedOption] = useState(data.rightOption);

  useEffect(() => {
    if (data && data.question) {
      setQuestion(data.question);
      setOptions(data.options);
      setSelectedOption(data.rightOption);
    }
  }, [data]);

  const handleOptionChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = {
      question,
      options,
      rightOption,
      id: data._id,
    };
    try {
      await axios.put("/api/interviewer/updateQuestionSet", updatedData);
      toast("Question Updated Successfully");
      select(null)
    } catch (err) {
      toast("Error While Updating ");
      console.log(err);
    }
    onClose();
  };

  return (
    <>
      <Card className="w-[650px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Update Question</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="Enter Your Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {options.map((option, index) => (
                  <div key={index}>
                    <Label htmlFor={`option${index + 1}`}>
                      Option {index + 1}
                    </Label>
                    <Input
                      id={`option${index + 1}`}
                      placeholder={`Enter Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rightOption">Right Option</Label>
                <select
                  id="rightOption"
                  name="rightOption"
                  className="border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 h-10"
                  value={rightOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default UpdateIndividualQuestionSet;
