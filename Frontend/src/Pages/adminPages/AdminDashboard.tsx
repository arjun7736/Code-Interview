import AdminHeader from "@/components/admin/AdminHeader";
import DataCard from "@/components/admin/DataCard";
import DataTable from "@/components/admin/DataTable";
import { AdminState } from "@/interface/userStateInterface";
import {  ThirdBG } from "@/lib/Color";
import { setCompanyData, setIntervieweeData, setInterviewerData, setPremiumCompanies } from "@/redux/slices/adminSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // const navigate =useNavigate()
const dispatch =useDispatch()
const { companyData, interviewerData, intervieweeData,premiumCompanies } = useSelector((state: RootState) => state.admin as AdminState)

const premium = async () => {

  // const [searchValue, setSearchValue] = useState<string>("");

    const premiumCompany = await axios.get("http://13.201.15.170/api/admin/premium-companies")
    const totalInterviewers = await axios.get("http://13.201.15.170/api/admin/getdata/?role=interviewer");
    const totalInterviewees = await axios.get("http://13.201.15.170/api/admin/getdata/?role=interviewee");
    const companyList = await axios.get("http://13.201.15.170/api/admin/getdata/?role=company");

    dispatch(setPremiumCompanies(premiumCompany.data));
    dispatch(setInterviewerData(totalInterviewers.data));
    dispatch(setIntervieweeData(totalInterviewees.data));
    dispatch(setCompanyData(companyList.data));
    
  }
  useEffect(() => {
    premium();
  },[]);

  // const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get(`/api/admin/search/${searchValue}`);
  //     console.log("Search result:", response.data);
  //   } catch (error) {
  //     console.error("Error searching:", error);
  //   }
  //   console.log("Search value:", searchValue);
  // };
  return (
    <>
      <div className="flex min-h-screen w-full flex-col" style={{ background: ThirdBG }}>
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <DataCard data={premiumCompanies}  type={"Premium Companies"} />
            <DataCard data={interviewerData} type={"Total Interviewers"}/>
            <DataCard data={intervieweeData} type={"Total Interviewees"}/>
            <DataCard data={companyData} type={"Total Companies"}/>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
            <DataTable data={companyData} type={"New Companies"}/>
            <DataTable data={intervieweeData} type={"New Interviewees"}/>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
