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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { logout } from "@/redux/slices/companySlice";
import axios from "axios";
import { Avatar, AvatarImage } from "../ui/avatar";
import { MainBackGround } from "@/lib/Color";
import Cookies from 'js-cookie';
import 'ldrs/dotStream'


const CompanyNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyData } = useSelector((state: RootState) => state.company);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyData) {
      navigate("/company/login");
    }
    setLoading(false);
  }, [companyData, navigate]);

  const handleLogout = async (): Promise<void> => {
    try {
      dispatch(logout());
      await axios.get("https://electronix.today/api/auth/logout");
      Cookies.remove('company_token', { sameSite: 'Lax' });
      toast("Logout Successful");
      navigate("/company/login");
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
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
<l-dot-stream
  size="60"
  speed="2.5"
  color="black" 
></l-dot-stream>
      </div>
    );
  }

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
                  <AvatarImage src={companyData?.profile_picture} />
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

export default CompanyNavbar;
