import AdminNavbar from "@/components/admin/AdminNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DataCard from "@/components/admin/DataCard";
import DataTable from "@/components/admin/DataTable";
import axios from "axios";

function AdminHome() {
  const [company, setCompany] = useState([]);
  const [interviewer, setInterviewer] = useState([]);
  const [interviewee, setInterviewee] = useState([]);
  const [companies, setCompanies] = useState([]);

  const premium = async () => {
    const PremiumCompanies = await axios.get("/api/admin/premium-companies");
    const TotalInterviewers = await axios.get("/api/admin/interviewer-data");
    const TotalInterviewees = await axios.get("/api/admin/interviewee-data");
    const CompanyList =await axios.get("/api/admin/company-data")
    setCompany(PremiumCompanies.data);
    setInterviewer(TotalInterviewers.data);
    setInterviewee(TotalInterviewees.data);
    setCompanies(CompanyList.data)
  };

  useEffect(() => {
    premium();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <div className="w-1/6">
          <AdminSidebar />
        </div>
        <div className="md:ml-32 flex flex-col gap-5 mt-10">
          <div className="flex gap-12">
            <DataCard data={company} type={"Premium Companies"} />
            <DataCard data={interviewer} type={"Total Interviewers"} />
            <DataCard data={interviewee} type={"Total Interviewees"} />
            <DataCard data={companies} type={"Total Companies"} />
          </div>
          <div className="flex gap-5 mt-5">
            <DataTable data={company} type={"New Companies"}/>
            <DataTable data={interviewee} type={"New Interviewees"}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
