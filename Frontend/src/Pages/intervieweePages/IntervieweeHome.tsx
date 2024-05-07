import IntervieweeNavbar from '@/components/interviewee/IntervieweeNavbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const IntervieweeHome = () => {
  return (
    <>
    <IntervieweeNavbar/>
    <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="mt-16 text-center">
          <h1 className="font-serif text-4xl">
            Welcome To Code-Interview Interviewee Home page Here You Can Attend Interview and Practice
            Coding! in Many Languages
          </h1>
        </div>
        <div className="flex ">
          <Input className=" w-56" placeholder="Put Meeting Lnk here" />
          <Button className="mx-2 ">
            {" "}
            Join Meeting{" "}
          </Button>
        </div>
      </div>
    </>
  )
}

export default IntervieweeHome