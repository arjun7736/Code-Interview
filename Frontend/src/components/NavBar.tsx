import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CircleUser} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavBar = () => {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className=" w-56 gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          Code-Interview
        </nav>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
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
