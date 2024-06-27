import AdminHeader from '@/components/admin/AdminHeader'
import UsersTable from '@/components/admin/UsersTable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { logout, setInterviewerData } from '@/redux/slices/adminSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ThirdBG } from '@/lib/Color';


const InterviewerList = () => {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const getInterviewerData = async ():Promise<void> => {
    await axios
      .get("http://13.233.229.71/api/admin/getdata/?role=interviewer")
      .then((data) => {
        dispatch(setInterviewerData(data.data));
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
    getInterviewerData();
  }, []);
  const { interviewerData } = useSelector((state: RootState) => state.admin);

  return (
    <div className="flex min-h-screen w-full flex-col">
    <AdminHeader />
    <Card style={{backgroundColor:ThirdBG}} className='min-h-[90vh]'>
      <CardHeader>
        <CardTitle>Interviewers</CardTitle>
        <CardDescription>
          Manage Interviewers and view their Status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable data={interviewerData} fun={getInterviewerData}/>
      </CardContent>
    </Card>
  </div>
  )
}

export default InterviewerList