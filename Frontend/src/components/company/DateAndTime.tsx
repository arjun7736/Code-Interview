
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { toast } from "sonner"


const DateAndTime = ({email, selectedOption}: { email: string, selectedOption: string }) => {
    const [date, setDate] = React.useState<Date>()
    const [time, setTime] = React.useState('00:00');

    const handleTimeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
      setTime(e.target.value);
    };
    const handleButtonClick = async() => {
        try {
          await axios.post("http://13.201.15.170/api/company/createMeeting",{intervieweeEmail:email,interviewerEmail:selectedOption,date:date,time:time})
          toast("Link Sent Successfully")
          console.log(date,time)
        } catch (error) {
          console.log(error)
        }
      };
  return (
    <>
    <div className="flex items-center space-x-2 mb-3">
     <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <form className="max-w-[8rem] mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="time"
          id="time"
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          min="09:00"
          max="18:00"
          value={time}
          onChange={handleTimeChange}
          required
        />
      </div>
    </form>
    </div>
    <Button onClick={handleButtonClick}>Schedule an Interview</Button>
    </>
  )
}

export default DateAndTime
