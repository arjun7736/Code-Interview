import React, { useEffect, useState } from "react";
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

function CompanyNavbar() {


  const navigate = useNavigate();
  useEffect(() => {
    const companyData = localStorage.getItem("company_token");
    if (!companyData) {
      navigate("/company/login");
    } else {
      navigate("/company");
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("company_token");
    await axios
      .get("/api/auth/logout")
      .then(() => {
        toast("Logout Successfully");
        navigate("/company/login");
      })
      .catch((error) => {
        toast(error);
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
              <DropdownMenuLabel
                className="cursor-pointer"
                // onClick={openProfileModal}
              >
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

export default CompanyNavbar;
