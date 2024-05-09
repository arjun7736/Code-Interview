import AdminHeader from "@/components/admin/AdminHeader";
import UsersTable from "@/components/admin/UsersTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logout, setCompanyData } from "@/redux/slices/adminSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const CompanyList = () => {
  const dispatch = useDispatch();

  const getCompanyData = async ():Promise<void> => {
    await axios
      .get("/api/admin/getdata/?role=company")
      .then((data) => {
        dispatch(setCompanyData(data.data));
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast("Error Occurred, try logging in again");
         dispatch(logout())
        }
      });
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const { companyData } = useSelector((state: RootState) => state.admin);

  
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <AdminHeader />
        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>
              Manage Company and view their Status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable data={companyData} fun={getCompanyData}/>
          </CardContent>
        </Card>
      </div>
      
    </>
  );
};

export default CompanyList;