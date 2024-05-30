
import { interviewersQuestions } from "@/redux/slices/tempSlice"
import { RootState } from "@/redux/store"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const QuestionList = () => {
    const [data, setData] = useState()
    const [selected, setSelected] = useState()
    const dispatch = useDispatch()
    const { interviewersQuestion } = useSelector((state: RootState) => state.temp)

    if (data) {
        setSelected(interviewersQuestion[data])
    }
    console.log(selected)

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
                <div className="h-10 bg-white mx-3 my-4 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => setData(data?.questionSet)}>
                    <div>
                        QuestionSet  {data?.questionSet}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionList