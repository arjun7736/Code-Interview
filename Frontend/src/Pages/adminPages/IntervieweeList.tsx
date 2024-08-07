import AdminHeader from "@/components/admin/AdminHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "@/components/admin/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, setIntervieweeData } from "@/redux/slices/adminSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThirdBG } from "@/lib/Color";
import axiosInstance from "../../intersepters/axiosBackendIntersepter";

const IntervieweeList = () => {
const dispatch =useDispatch()
const navigate =useNavigate()

  const getIntervieweeData = async ():Promise<void> => {
    await axiosInstance
      .get("/api/admin/getdata/?role=interviewee")
      .then((data) => {
        dispatch(setIntervieweeData(data.data));
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast("Error Occurred, try logging in again");
          dispatch(logout())
          navigate("/")
        }
      });
  };

  useEffect(() => {
    getIntervieweeData();
  }, []);
  const { intervieweeData } = useSelector((state: RootState) => state.admin);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <AdminHeader />
        <Card style={{backgroundColor:ThirdBG}} className='min-h-[90vh]'>
          <CardHeader>
            <CardTitle>Interviewees</CardTitle>
            <CardDescription>
              Manage Interviewees and view their Status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable data ={intervieweeData} fun={getIntervieweeData}/>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default IntervieweeList;
