import { setQuestion } from "@/redux/slices/tempSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Question = () => {
  const question= useSelector((state:RootState)=>state.temp.question)

  const dispatch =useDispatch()
  const [message,setMessage]=useState("")
  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessage(message)

    });

    return () => {
      socket.off('receive_message');
      dispatch(setQuestion(""))
    };
  }, []);


    return (
       <>
       {question?(<div className="absolute top-3 ml-10">
        <div>
          <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-500 text-white font-medium text-sm">
              Q
          </span>
        </div>
        <p className="ml-4 md:ml-6 text-xl">
          {message}
        </p>
      </div>):""}
       </>
    )
}

export default Question