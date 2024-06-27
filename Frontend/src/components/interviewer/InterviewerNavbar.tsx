import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import axios from "axios";
import { logout } from "@/redux/slices/interviewerSlice";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { MainBackGround } from "@/lib/Color";
import Cookies from 'js-cookie';

const InterviewerNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { interviewerData } = useSelector(
    (state: RootState) => state.interviewer
  );
  useEffect(() => {
    if (!interviewerData) {
      navigate("/interviewer/login");
    }
  }, []);
  const handleLogout = async (): Promise<void> => {
    try {
      dispatch(logout());
      await axios.get("/api/auth/logout");
      Cookies.remove('interviewer_token', { sameSite: 'Lax' });
      toast("Logout Successful");
      navigate("/");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        toast("Error Occurred, try logging in again");
        dispatch(logout());
        navigate("/")
      } else {
        toast("Error Occurred, try logging in again");
      }
    }
  };
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6" style={{backgroundColor:MainBackGround}}>
        <nav className=" w-56 gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 text-white">
          Code-Interview
        </nav>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={interviewerData?.profile_picture} />
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default InterviewerNavbar;
