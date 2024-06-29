import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { CircleUser, Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AdminState } from "@/interface/userStateInterface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { logout } from "@/redux/slices/adminSlice";
import { MainBackGround } from "@/lib/Color";
import Cookies from 'js-cookie';
import 'ldrs/dotStream'

const AdminHeader = () => {
  const navigate =useNavigate()
const dispatch =useDispatch()
const [loading, setLoading] = useState(true);

const {adminData} = useSelector((state:RootState) => state.admin as AdminState);

useEffect(() => {
  if(!adminData){
    navigate("/admin/login")
  }
  setLoading(false);
}, [adminData, navigate]);

const handleLogout = async (): Promise<void> => {
  try {
    dispatch(logout())
    await axios.get('https://electronix.today/api/auth/logout'); 
    Cookies.remove('admin_token', { sameSite: 'Lax' });
    toast('Logout Successful');
    navigate('/');

  } catch (error) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      toast('Error Occurred, try logging in again');
      dispatch(logout())
      navigate("/")
    } else {
      toast('Error Occurred, try logging in again');
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
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6" style={{backgroundColor: MainBackGround, boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"}}>
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 text-white">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          Code-Interview
        </Link>
        <Link
          to="/admin/dashboard"
          className="text-white transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/interviewee-list"
          className="text-white  transition-colors hover:text-foreground"
        >
          Interviewee List
        </Link>
        <Link
          to="/admin/interviewer-list"
          className="text-white transition-colors hover:text-foreground"
        >
          Interviewer list
        </Link>
        <Link
          to="/admin/company-list"
          className="text-white transition-colors hover:text-foreground"
        >
          Company List
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              Code-Interview
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-white transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/interviewee-list"
              className="text-white transition-colors hover:text-foreground"
            >
              Interviewee List
            </Link>
            <Link
              to="/admin/interviewer-list"
              className="text-white transition-colors hover:text-foreground"
            >
              Interviewer list
            </Link>
            <Link
              to="/admin/company-list"
              className="text-white transition-colors hover:text-foreground"
            >
              Company List
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
