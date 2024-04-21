import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Listbox, ListboxItem } from "@nextui-org/react";
import CompanyNavbar from "@/components/company/CompanyNavbar";
import { Button } from "@/components/ui/button";
import AddInterviewer from "../../components/company/AddInterviewer";
import { useDispatch, useSelector } from "react-redux";
import {
  interviewersListError,
  interviewersListStart,
  interviewersListSuccess,
} from "@/redux/slices/companySlice";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import UpgradePlan from "../../components/company/UpgradePlan";
import { SquarePen } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import DeleteAndEdit from "@/components/company/DeleteAndEdit";

const CompanyHome = () => {


  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { loading, error, interviewers } = useSelector(
    (state) => state.company
  );

  const handleEdit = () => {
    setConfirmationAction('edit');
    setIsConfirmationOpen(true);
  };
  
  const handleDelete = () => {
    setConfirmationAction('delete');
    setIsConfirmationOpen(true);
  };
  
  
  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };
    
 
 
  const data = localStorage.getItem("company_token");
  const company = JSON.parse(data);
  const fetchData = async () => {
    dispatch(interviewersListStart());
    try {
      const response = await axios.get(
        `/api/company/interviewers?Id=${company?._id}`
      );
      dispatch(interviewersListSuccess(response.data[0].interviewers));
    } catch (error) {
      dispatch(interviewersListError(error.message));
      if (error.response.status == 401 || error.response.status == 403) {
        toast("Error Occured try Login Agian");
        localStorage.removeItem("company_token");
        window.location.reload()
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderPopup = () => {
    if (interviewers?.length >= 2&& !company?.isPremium) {
      return <UpgradePlan isOpen={isPopupOpen} onClose={closePopup} />;
    } else {
      return <AddInterviewer isOpen={isPopupOpen} onClose={closePopup} />;
    }
  };

  const handleInterviewerClick = (interviewer) => {
    setSelectedInterviewer(interviewer);
  };

  return (
    <>
      <CompanyNavbar />
      <div className="md:ml-20 md:gap-10 md:grid md:justify-end md:mt-20 justify-center mt-10 grid-cols-1 md:grid-cols-2  p-5 md:p-0">
        <div className=" md:w-96">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">Interviewers</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              {loading ? (
                <PulseLoader size={10} />
              ) : interviewers?.length > 0 ? (
                <Listbox
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                >
                  {interviewers.map((interviewer) => (
                    <ListboxItem
                      key={interviewer._id}
                      onClick={() => handleInterviewerClick(interviewer)}
                    >
                      {interviewer.email}
                    </ListboxItem>
                  ))}
                </Listbox>
              ) : (
                <p>No interviewers available.</p>
              )}
              <Button onClick={openPopup}>Add Interviewer</Button>
            </CardBody>
          </Card>
        </div>
        <div className="md:block order-last md:order-first mt-10 md:mt-0">
          {selectedInterviewer ? (
            <>
              <Card className="max-w-[720px]">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{selectedInterviewer?.email}</p>
                    <p className="text-small text-default-500">
                      {selectedInterviewer?.name}
                    </p>
                  </div>
                  <div className="flex gap-5 ml-20">
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
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Previous Interview Data</p>
                </CardBody>
              </Card>
            </>
          ) : (
            <p>
              Welcome To The Company Home Page You are Logged in as{" "}
              {company?.name}
            </p>
          )}{" "}
        </div>
      </div>
      {renderPopup()}
      <DeleteAndEdit
  isOpen={isConfirmationOpen}
  action={confirmationAction === 'edit' ? 'Edit' : 'Delete'}
  onCancel={handleCancel}
  selectedInterviewer={selectedInterviewer}
  fetchData={fetchData}
  setSelectedInterviewer={setSelectedInterviewer}
/>

    </>
  );
};

export default CompanyHome;
