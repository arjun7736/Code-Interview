import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"


const QuestionList:React.FC=({select}) => {
    const { interviewersQuestion } = useSelector((state: RootState) => state.temp)

    const filteredQuestions = interviewersQuestion?.filter((data) => data.questions.length > 0) || [];
   
    return (
        <div className="">
            {filteredQuestions.length>0?(filteredQuestions?.map((data) => (
                <div className="h-10 bg-white mx-3 my-4 rounded-lg flex items-center justify-center cursor-pointer" key={data?.id} onClick={() => select(data)}>
                    <div >
                        QuestionSet  {data?.questionSet}
                    </div>
                </div>
            ))):<>
            <div>
                No Data Available
            </div>
            </>}
        </div>
    )
}

export default QuestionList