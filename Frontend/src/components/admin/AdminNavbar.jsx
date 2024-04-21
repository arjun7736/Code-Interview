import React, { useEffect } from "react";
import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";

function AdminNavbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("admin_token");
    if (!adminData) navigate("/admin/login");
  }, []);
  
  const handleLogout = async() => {
    localStorage.removeItem("admin_token");
    await axios
    .get("/api/auth/logout")
    .then(() => {
      toast("Logout Successfully");
      navigate("/admin/login")
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 403) {
        toast("Error Occured try Login Agian");
        localStorage.removeItem("admin_token");
        window.location.reload()
      }
    });
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
              <DropdownMenuLabel className="cursor-pointer">
                Profile
              </DropdownMenuLabel>
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

export default AdminNavbar;
