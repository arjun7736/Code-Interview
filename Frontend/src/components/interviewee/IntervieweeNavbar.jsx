import React, { useEffect } from "react";
import axios from "axios";
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
import { toast } from "sonner";
import { signOut, getAuth } from "firebase/auth";

function IntervieweeNavbar() {
  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const intervieweeData = localStorage.getItem("interviewee_token");
    const data = JSON.parse(intervieweeData);
    if (!intervieweeData) {
      navigate("/interviewee/login");
    } else {
      navigate("/interviewee");
    }
  }, []);

  const handleLogout = async () => {
    const intervieweeData = localStorage.getItem("interviewee_token");
    const data = JSON.parse(intervieweeData);
    const google = data.providerId == "google.com";

    if (google) {
      await signOut(auth);
    }
      await axios
        .get("/api/auth/logout")
        .then(() => {
          toast("Logout Successfully");
          navigate("/interviewee/login");
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            toast("Error Occured try Login Agian");
            localStorage.removeItem("interviewee_token");
            window.location.reload();
          }
        });
    localStorage.removeItem("interviewee_token");
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
              <DropdownMenuItem className="cursor-pointer"onClick={handleProfileClick}>Profile</DropdownMenuItem>
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

export default IntervieweeNavbar;
