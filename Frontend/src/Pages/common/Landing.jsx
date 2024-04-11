import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { RiVideoAddFill } from "react-icons/ri";


const Landing = () => {
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="flex absolute bottom-20 lg:left-10 md:left-2">
        <Input className=" w-56" placeholder="Put Meeting Lnk here"/>
        <Button className="mx-2 ">  <RiVideoAddFill className="mx-1"/>Join Meeting  </Button>
      </div>
    </div>
  );
};  

export default Landing;