import IntervieweeNavbar from '@/components/interviewee/IntervieweeNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { RiVideoAddFill } from 'react-icons/ri';

const IntervieweeHome = () => {

  return (
    <>
    <IntervieweeNavbar/>
      <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="mt-16 text-center">
        <h1 className="font-serif text-4xl">
          Welcome To Code-Interview Interviewee Home page Here You Can Attend Interview and Test Your Coding Skills
        </h1>
      </div>
      <div className="flex absolute bottom-20 lg:left-10 md:left-2">
      <Input className=" w-56" placeholder="Put Meeting Lnk here" />
        <Button className="mx-2 ">
          {" "}
          <RiVideoAddFill className="mx-1" />
          Join Meeting{" "}
        </Button>
      </div>
    </div>
    </>
  )
}

export default IntervieweeHome