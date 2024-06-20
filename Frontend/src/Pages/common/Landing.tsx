import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainBackGround } from "@/lib/Color";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const joinRoom = () => {
    toast("Please Login ");
  };

  const images = useMemo(() => [
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_video_call_re_4p26.svg?alt=media&token=df00cf93-4407-40ec-aeb5-bcd19ded9307",
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_programming_re_kg9v.svg?alt=media&token=e9b54b70-edd6-4c80-b8a7-db1f5957ce34",
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_group_video_re_btu7.svg?alt=media&token=8c923bc1-74d2-4e22-afad-44db51ad9e87",
    "https://firebasestorage.googleapis.com/v0/b/code-interview-f70f2.appspot.com/o/undraw_code_thinking_re_gka2.svg?alt=media&token=59c826f0-0fe9-4937-9279-b306103e8aa6"
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <>
      <NavBar />
      <div
        className="min-h-[90vh] flex flex-col justify-center items-start space-y-12 px-4"
        style={{ backgroundColor: "black" }}
      >
        <div className="w-full gap-5 flex  justify-center ">
          <div className="flex flex-col text-center justify-center items-center">
            <h1 className="font-bold text-4xl text-gray-800">
              Welcome To Code-Interview
            </h1>
            <p className="text-lg mt-4 text-gray-600">
              Attend interviews and practice coding in many languages.
            </p>
            <div className="flex mt-10">
          <Input
            className="w-64 p-2 border border-gray-300 rounded-md shadow-sm  focus:ring  focus:ring-opacity-50"
            placeholder="Put Meeting Link here"
          />
          <Button
            className="ml-2 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2  focus:ring-opacity-75 transition duration-150 ease-in-out" style={{backgroundColor:MainBackGround}}
            onClick={joinRoom}
          >
            Join Meeting
          </Button>
        </div>
          </div>
          <div className="max-w-[40vw]">
            <img src={images[currentImageIndex]} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
