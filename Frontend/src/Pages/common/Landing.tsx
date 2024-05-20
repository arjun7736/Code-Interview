import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <NavBar />
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="mt-16 text-center">
          <h1 className="font-serif text-4xl">
            Welcome To Code-Interview Here You Can Attend Interview and Practice
            Coding! in Many Languages
          </h1>
        </div>
        <div className="flex ">
          <Input className=" w-56" placeholder="Put Meeting Lnk here" />
          <Button className="mx-2 ">
            Join Meeting{" "}
          </Button>
        </div>
       <Link to={"/compiler"}><Button >Compiler</Button></Link> 
      </div>
    </>
  );
};

export default Landing;
