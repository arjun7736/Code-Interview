import AddInterviewer from "@/components/company/AddInterviewer";
import CompanyNavbar from "@/components/company/CompanyNavbar";
import DeleteAndEdit from "@/components/company/DeleteAndEdit";
import UpgradePlan from "@/components/company/UpgradePlan";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  interviewersError,
  interviewersStart,
  interviewersSuccess,
} from "@/redux/slices/companySlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";


interface Interviewer {
  _id: string;
  email: string;
  name?: string; 
  profile_picture?:string
}

const CompanyHome = () => {
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
        `/api/company/interviewers?Id=${companyData?._id}`
      ).then((data)=>{
        dispatch(interviewersSuccess(data.data[0].interviewers));
        console.log(data);
      })
    } catch (error) {
      dispatch(interviewersError(error.message));
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast("Error Occured try Login Agian");
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
    if (interviewers?.length >= 2 && !companyData?.isPremium) {
      return <UpgradePlan isOpen={isPopupOpen} onClose={closePopup} />;
    } else {
      return <AddInterviewer isOpen={isPopupOpen} onClose={closePopup} />;
    }
  };

  const handleInterviewerClick = (interviewer: Interviewer) => {
    setSelectedInterviewer(interviewer);
  };

  useEffect(() => {
    fetchData();
  }, [isConfirmationOpen]);
console.log(interviewers)
  return (
    <>
      <CompanyNavbar />
      <div className="md:ml-20 md:gap-10 md:grid md:justify-end md:mt-20 justify-center mt-10 grid-cols-1 md:grid-cols-2  p-5 md:p-0">
        <div className=" md:w-96">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">Interviewers</h4>
            </CardHeader>
            <Table>
              {loading ? (
                <PulseLoader size={10} />
              ) : interviewers?.length > 0 ? (
                <TableBody>
                  {interviewers?.map((interviewer) => (
                    <TableRow key={interviewer?._id}
                    onClick={() => handleInterviewerClick(interviewer)}>
                      <TableCell>
                        <div className="font-medium">{interviewer?.name}</div>
                      </TableCell>
                      <TableCell>
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
            <Button onClick={openPopup} variant={"ghost"} className="ml-28 mt-5">Add Interviewer</Button>
          </Card>
        </div>
        <div className="md:block order-last md:order-first mt-10 md:mt-0">
          {selectedInterviewer ? (
            <>
              <Card className="max-w-[720px]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-row justify-around">
                    <Image
                      height={40}
                      radius="sm"
                      src={selectedInterviewer.profile_picture}
                      width={40}
                    />
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
                  <p>Previous Interview Data</p>
                </CardDescription>
              </Card>
            </>
          ) : (
            <p>
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
