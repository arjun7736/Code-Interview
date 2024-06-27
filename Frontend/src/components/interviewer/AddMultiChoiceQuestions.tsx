import { SetStateAction, ChangeEvent, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios"
import { toast } from "sonner"
import { MainBackGround } from "@/lib/Color"

const AddMultiChoiceQuestions:React.FC<MultiChoiceProps> = ({ onClose,questionSet }) => {
    if (!questionSet){
        questionSet=null
    }
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [rightOption, setSelectedOption] = useState('');
    const [addedQuestions, setAddedQuestions] = useState<AddedQuestion[]>([]);


    const handleAddQuestion = () => {
        setAddedQuestions(prevQuestions => [...prevQuestions, { question, options, rightOption }]);
        setQuestion('');
        setOptions([]);
        setSelectedOption('');
    };
    const handleQuestionChange = (e: { target: { value: SetStateAction<string> } }) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };
    

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        await axios.post("http://13.233.229.71/api/interviewer/addQuestions",{questions:addedQuestions,questionSet}).then(()=>{
            toast("Questions Added")
        }).catch(()=>{
            toast("error occured")
        })
        onClose()
    }
    
    return (
        <Card className="w-[650px] shadow-2xl">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Add Question</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="question">Question</Label>
                            <Input id="question" placeholder="Enter Your Question" value={question} onChange={handleQuestionChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {[...Array(4)].map((_, index) => (
                                <div key={index}>
                                    <Label htmlFor={`option${index + 1}`}>Option {index + 1}</Label>
                                    <Input id={`option${index + 1}`} placeholder={`Enter Option ${index + 1}`} value={options[index]} onChange={(e) => handleOptionChange(e, index)} />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="answer">Right Option</Label>
                            <select id="rightOption" name="rightOption" className="border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 h-10" value={rightOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <Button  type ="button" onClick={handleAddQuestion} style={{backgroundColor:MainBackGround}}>Add</Button>

                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" style={{backgroundColor:MainBackGround}}>Submit</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddMultiChoiceQuestions


interface MultiChoiceProps{
    onClose:()=>void
    questionSet?:number|null
}
interface AddedQuestion {
    question: string;
    options: string[];
    rightOption: string;
}