import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const naviagte = useNavigate();
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Code-Interview</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="bordered">
                  Login
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new" onClick={()=>naviagte("/interviewee/login")}>Interviewee Login</DropdownItem>
                <DropdownItem key="copy"onClick={()=>naviagte("/company/login")}>Comapany Login</DropdownItem>
                <DropdownItem key="edit"onClick={()=>naviagte("/interviewer/login")}>Interviewer Login</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
