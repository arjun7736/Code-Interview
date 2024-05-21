import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const joinRoom=()=>{
   toast("Please Login ")
  }
  const images=["https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_Group_video_re_btu7.png?alt=media&token=e7be1d43-54ff-4d0a-83f9-a4522677f59d","https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_Programmer_re_owql.png?alt=media&token=b8ab3fdd-ee29-4a26-830e-7554c16bf7c7","https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_Programming_re_kg9v.png?alt=media&token=2d34ac08-8bf7-4a0b-90a5-be175294814a","https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_video_call_re_4p26.svg?alt=media&token=df00cf93-4407-40ec-aeb5-bcd19ded9307"]
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    },5000); 
    return () => clearInterval(timer); 
  }, [images]);

  return (
    <>
      <NavBar />
      <div className="min-h-[90vh] flex flex-col justify-center items-start space-y-12 px-4">
      <img src={images[currentImageIndex]} alt="" className="absolute inset-0 w-full h-full object-scale-down  z-[-1]" />     
        <div className="text-center">
          <h1 className="font-bold text-4xl text-gray-800">Welcome To Code-Interview</h1>
          <p className="text-lg mt-4 text-gray-600">
            Attend interviews and practice coding in many languages.
          </p>
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Link to={"/compiler"}>
            <Button className="py-2 px-4 mt-10 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2  focus:ring-opacity-75 transition duration-150 ease-in-out">
              Compiler
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-10 left-0 mb-4 ml-4 flex">
          <Input className="w-64 p-2 border border-gray-300 rounded-md shadow-sm  focus:ring  focus:ring-opacity-50" placeholder="Put Meeting Link here" />
          <Button className="ml-2 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2  focus:ring-opacity-75 transition duration-150 ease-in-out" onClick={joinRoom}>
            Join Meeting
          </Button>
        </div>
      </div>
    </>
  );
};

export default Landing;
