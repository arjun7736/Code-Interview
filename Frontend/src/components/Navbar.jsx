import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-20 w-full bg-slate-200  flex items-center justify-between">
      <div className="container h-full w-56 bg-slate-400 mx-10"></div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent mx-10 text-black">
            Login/SignUp
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
           <Link to="/interviewee-login"><Button className="my-3 bg-slate-600 hover:bg-slate-800 w-full">Login As Interviewee</Button></Link> 
            <div className="flex items-cente justify-center">
            <DialogDescription > OR </DialogDescription>
            </div>
          </DialogHeader>
            <div className="flex items-center justify-between">
          <Link to="/interviewer-login"> <Button className="bg-slate-600 hover:bg-slate-800">Login As Interviewer</Button></Link> 
          <Link to="/company-login"> <Button className="bg-slate-600 hover:bg-slate-800">Login As Company</Button></Link> 
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
