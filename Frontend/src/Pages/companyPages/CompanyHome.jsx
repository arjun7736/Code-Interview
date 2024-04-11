import Navbar from "@/components/Navbar";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import React  from "react";
import axios from "axios";

const CompanyHome = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .get("/api/auth/logout")
      .then((data) => {
        localStorage.removeItem(data.data.user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
   <div>Welcome Home</div>
  );
};

export default CompanyHome;
