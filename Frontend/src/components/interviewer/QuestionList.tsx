import { RootState } from "@/redux/store"
import {  useSelector } from "react-redux"

interface QuestionListProps {
    select: React.Dispatch<React.SetStateAction<any>>;
  }

const QuestionList:React.FC<QuestionListProps>=({select}) => {
    const { interviewersQuestion } = useSelector((state: RootState) => state.temp)
   
    return (
        <div className="">
            {interviewersQuestion&& interviewersQuestion?.length>0?(interviewersQuestion?.map((data:any) => (
                <div className="h-10 bg-gray-200 mx-3 my-4 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => select(data)}>
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