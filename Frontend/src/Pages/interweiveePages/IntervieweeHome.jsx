import IntervieweeNavbar from '@/components/interviewee/IntervieweeNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/react';
import React, { useEffect } from 'react'
import { RiVideoAddFill } from 'react-icons/ri';

const IntervieweeHome = () => {

  return (
    <>
    <IntervieweeNavbar/>
    <div className="flex absolute bottom-20 lg:left-10 md:left-2">
        <Input className=" w-56" placeholder="Put Meeting Lnk here" />
        <Button className="mx-2 ">
          {" "}
          <RiVideoAddFill className="mx-1" />
          Join Meeting{" "}
        </Button>
      </div>
    </>
  )
}

export default IntervieweeHome