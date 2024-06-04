import { interviewersQuestions } from "@/redux/slices/tempSlice"
import { RootState } from "@/redux/store"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const QuestionList:React.FC=({select}) => {
    const dispatch = useDispatch()
    const { interviewersQuestion } = useSelector((state: RootState) => state.temp)


    const getQuestions = async () => {
        await axios.get("/api/interviewer/getQuestions").then((data) => {
            dispatch(interviewersQuestions(data?.data))
        }).catch((error) => {
            console.error(error);
        })
    }
    useEffect(() => {
        getQuestions()
    }, [])
    return (
        <div className="">
            {interviewersQuestion?.map((data) => (
                <div className="h-10 bg-white mx-3 my-4 rounded-lg flex items-center justify-center cursor-pointer" key={data?.id} onClick={() => select(data)}>
                    <div >
                        QuestionSet  {data?.questionSet}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionList