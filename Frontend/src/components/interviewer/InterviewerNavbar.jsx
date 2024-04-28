import React, { useEffect } from "react";
import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios"
import { toast } from "sonner";




function InterviewerNavbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const interviewerData = localStorage.getItem("interviewer_token");
    if (!interviewerData) {
      navigate("/interviewer/login");
    } else {
      navigate("/interviewer");
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("interviewer_token");
    await axios
      .get("/api/auth/logout")
      .then(() => {
        toast("Logout Successfully");
        navigate("/interviewer/login");
      })
      .catch((error) => {
        toast(error);
      });
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <>
      <nav className="flex justify-between items-center bg-gray-800 text-white p-3">
        <div>
          <Link to="/">
            <p className="h-8 w-auto">Code-Interview</p>
          </Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
               className="cursor-pointer"
               onClick={handleProfileClick}
              >Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

export default InterviewerNavbar;
