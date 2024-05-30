import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const Question = () => {
    const question = useSelector((state: RootState) => state.temp.question);

    return (
       <>
       <div className="absolute top-3 ml-10">
        <div>
          <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-500 text-white font-medium text-sm">
              Q
          </span>
        </div>
        <p className="ml-4 md:ml-6 text-xl">
          {question}
        </p>
      </div>
       </>
    )
}

export default Question