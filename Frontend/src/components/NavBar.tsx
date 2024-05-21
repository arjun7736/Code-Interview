import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const NavBar = () => {
  const {interviewerData}=useSelector((state:RootState)=>state.interviewer)
  const {intervieweeData}=useSelector((state:RootState)=>state.interviewee)
  const {companyData}=useSelector((state:RootState)=>state.company)

  const navigate = useNavigate(); 

  useEffect(() => {
    if (companyData) {
      navigate("/company");
    } else if (intervieweeData) {
      navigate("/interviewee");
    } else if (interviewerData) {
     navigate("/interviewer");
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className=" w-56 gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          Code-Interview
        </nav>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary"  className="rounded-lg w-20 outline-none">
                Login
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
             <Link to="/interviewee/login"> <DropdownMenuItem>Interviewee Login</DropdownMenuItem></Link>
            <Link to="/company/login"><DropdownMenuItem>Company Login</DropdownMenuItem></Link>
            <Link to="/interviewer/login"><DropdownMenuItem>Interviewer Login</DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default NavBar;
