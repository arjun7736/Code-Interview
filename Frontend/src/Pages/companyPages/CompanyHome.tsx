import AddInterviewer from "@/components/company/AddInterviewer";
import CompanyNavbar from "@/components/company/CompanyNavbar";
import DeleteAndEdit from "@/components/company/DeleteAndEdit";
import UpgradePlan from "@/components/company/UpgradePlan";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  interviewersError,
  interviewersStart,
  interviewersSuccess,
  logout,
} from "@/redux/slices/companySlice";
import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import DateAndTime from "@/components/company/DateAndTime";
import PreviousInterviewData from "@/components/company/PreviousInterviewData";
import { Light, MainBackGround, ThirdBG } from "@/lib/Color";


interface Interviewer {
  _id: string;
  email: string;
  name?: string; 
  profile_picture?:string
}

const CompanyHome = () => {
  const [interviewData,setInterviewData]=useState([])
  const navigate =useNavigate()
  const { interviewers, loading,companyData } = useSelector(
    (state: RootState) => state.company
  );

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "edit" | "delete" | null
  >(null);

  const dispatch = useDispatch();
  const [selectedInterviewer, setSelectedInterviewer] =useState<Interviewer | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEdit = () => {
    setConfirmationAction("edit");
    setIsConfirmationOpen(true);
  };

  const handleDelete = () => {
    setConfirmationAction("delete");
    setIsConfirmationOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  const fetchData = async () => {
    dispatch(interviewersStart());
    try {
       await axios.get(
        `https://electronix.today/api/company/interviewers?Id=${companyData?._id}`
      ).then((data)=>{
        dispatch(interviewersSuccess(data.data[0].interviewers));
      })
    } catch (error) {
      const axiosError = error as AxiosError; 
      dispatch(interviewersError(axiosError.message));
      if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
        toast("Error Occured try Login Agian");
        dispatch(logout())
        navigate("/")
      }
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderPopup = () => {
    if (interviewers&&interviewers?.length >= 2 && !companyData?.isPremium) {
      return <UpgradePlan isOpen={isPopupOpen} onClose={closePopup} />;
    } else {
      return <AddInterviewer isOpen={isPopupOpen} onClose={closePopup} />;
    }
  };

  const handleInterviewerClick = async(interviewer: Interviewer) => {
    setSelectedInterviewer(interviewer);
   await axios.get(`https://electronix.today/api/company/getInterviewDataAndQuestions/${interviewer._id}`).then((data)=>{
     setInterviewData(data.data)
   }).catch(()=>{
toast("Unexpected Error Occured")
  })
  };

  useEffect(() => {
    fetchData();
  }, [isConfirmationOpen]);


  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');

  const handleSelectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <CompanyNavbar />
      <div className="md:pl-20 md:gap-10 md:grid md:justify-end md:pt-20 justify-center pt-10 grid-cols-1 md:grid-cols-2  p-5 md:p-0" style={{backgroundColor:ThirdBG}}>
        <div className=" md:w-96">
          <Card className="py-4" style={{backgroundColor:Light}}> 
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">Interviewers</h4>
            </CardHeader>
            <Table>
              {loading ? (
                <PulseLoader size={10} />
              ) :interviewers && interviewers?.length > 0 ? (
                <TableBody className="bg-gray-300">
                  {interviewers?.map((interviewer:any) => (
                    <TableRow key={interviewer?._id}
                    onClick={() => handleInterviewerClick(interviewer)}>
                      <TableCell className="rounded-l-xl">
                        <div className="font-medium">{interviewer?.name}</div>
                      </TableCell>
                      <TableCell className="rounded-r-xl">
                        <div className="hidden text-sm text-muted-foreground md:inline">
                         {interviewer?.email}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <p>No interviewers available.</p>
              )}
            </Table>
            <Button onClick={openPopup} className="ml-28 mt-5" style={{backgroundColor:MainBackGround}}>Add Interviewer</Button>
          </Card>
        </div>
        <div>
      <select className="w-96 my-5 h-10 rounded-lg" style={{backgroundColor:Light}} value={selectedOption} onChange={handleSelectChange}>
        {interviewers?.map((value:any)=>(
          <option value={value.email}>{value.email}</option>
        ))
       }
      </select>
      <Input
      className=" w-96"
        type="email"
        placeholder="Enter the Interviewee Email"
        value={email}
        onChange={handleInputChange}
      />
      <div className="my-2">
      <DateAndTime email ={email} selectedOption={selectedOption} />
      </div>
    </div>
        <div className="md:block order-last md:order-first mt-10 md:mt-0">
          {selectedInterviewer ? (
            <>
              <Card className="max-w-[720px]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-row justify-around"> 
                    <Avatar>
                      <AvatarImage src ={selectedInterviewer?.profile_picture||"https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"}/>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-md">{selectedInterviewer?.email}</p>
                      <p className="text-small text-default-500">
                        {selectedInterviewer?.name}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <FaRegEdit
                        size={18}
                        onClick={handleEdit}
                        className="cursor-pointer"
                      />
                      <MdDeleteForever
                        size={18}
                        onClick={handleDelete}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardDescription>
                 <PreviousInterviewData data ={interviewData || null}/>
                </CardDescription>
              </Card>
            </>
          ) : (
            <p className="text-xl">
              Welcome To The Company Home Page You are Logged in as{" "}
              {companyData?.name}
            </p>
          )}
        </div>
      </div>
      {renderPopup()}
      <DeleteAndEdit
        isOpen={isConfirmationOpen}
        action={confirmationAction === "edit" ? "Edit" : "Delete"}
        onCancel={handleCancel}
        selectedInterviewer={selectedInterviewer}
        fetchData={fetchData}
        setSelectedInterviewer={setSelectedInterviewer}
      />
    </>
  );
};

export default CompanyHome;
