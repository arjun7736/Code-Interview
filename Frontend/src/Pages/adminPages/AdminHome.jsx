import AdminNavbar from "@/components/admin/AdminNavbar";
import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DataCard from "@/components/admin/DataCard";
import DataTable from "@/components/admin/DataTable";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";

function AdminHome() {
  const [searchValue, setSearchValue] = useState("");

  const [company, setCompany] = useState([]);
  const [interviewer, setInterviewer] = useState([]);
  const [interviewee, setInterviewee] = useState([]);
  const [companies, setCompanies] = useState([]);

  const premium = async () => {
    const PremiumCompanies = await axios.get("/api/admin/premium-companies");
    const TotalInterviewers = await axios.get(
      "/api/admin/getdata/?role=interviewer"
    );
    const TotalInterviewees = await axios.get(
      "/api/admin/getdata/?role=interviewee"
    );
    const CompanyList = await axios.get("/api/admin/getdata/?role=company");
    setCompany(PremiumCompanies.data.slice(0, 4));
    setInterviewer(TotalInterviewers.data.slice(0, 4));
    setInterviewee(TotalInterviewees.data.slice(0, 4));
    setCompanies(CompanyList.data.slice(0, 4));
  };

  useEffect(() => {
    premium();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    await axios.get(`/api/admin/search/${searchValue}`).then((data)=>{
      console.log(data);
    }).catch((error)=>{
      console.error(error);
    })
    console.log("Search value:", searchValue);
  };
  return (
    <>
      <AdminNavbar />
      <div className="flex ">
        <div className="w-1/6">
          <AdminSidebar />
        </div>
        <div className="md:ml-32 flex flex-col gap-5 mt-10">
          <form onSubmit={handleSearch}>
            <div className="absolute right-72 top-2 flex gap-5">
              <Input
                className="cursor:pointer w-56"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
          <div className="flex gap-12 mt-3">
            <DataCard data={company} type={"Premium Companies"} />
            <DataCard data={interviewer} type={"Total Interviewers"} />
            <DataCard data={interviewee} type={"Total Interviewees"} />
            <DataCard data={companies} type={"Total Companies"} />
          </div>
          <div className="flex gap-5 mt-5">
            <DataTable data={companies} type={"New Companies"} />
            <DataTable data={interviewee} type={"New Interviewees"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
