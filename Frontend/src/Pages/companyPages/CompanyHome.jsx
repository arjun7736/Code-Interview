import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import CompanyNavbar from "@/components/company/CompanyNavbar";
import { Button } from "@/components/ui/button";
import AddInterviewer from "./AddInterviewer";
import { useDispatch, useSelector } from "react-redux";
import {
  interviewersListError,
  interviewersListStart,
  interviewersListSuccess,
} from "@/redux/slices/companySlice";
import { ScaleLoader } from "react-spinners";

const CompanyHome = () => {
  
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const data = localStorage.getItem("company_token");
  const company = JSON.parse(data);

  useEffect(() => {
    dispatch(interviewersListStart());
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/company/interviewers?Id=${company._id}`
        );
        dispatch(interviewersListSuccess(response.data[0].interviewers));
        console.log(response.data[0].interviewers);
      } catch (error) {
        dispatch(interviewersListError(error.message));
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const {loading,error,interviewers} =useSelector((state)=>state.company)

  console.log(interviewers,"interviewers");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );
  return (
    // <>
    //   <CompanyNavbar />
    //   <div className="md:grid md:justify-end md:mt-20 justify-center mt-10 grid-cols-1 md:grid-cols-2  p-5 md:p-0">
    //     <div className=" md:w-96">
    //       <Card className="py-4">
    //         <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
    //           <h4 className="font-bold text-large">Interviewers</h4>
    //         </CardHeader>
    //         <CardBody className="overflow-visible py-2">
    //           <Listbox
    //             aria-label="Single selection example"
    //             variant="flat"
    //             disallowEmptySelection
    //             selectionMode="single"
    //             selectedKeys={selectedKeys}
    //             onSelectionChange={setSelectedKeys}>

    //             <ListboxItem key="text">Text</ListboxItem>
               

    //           </Listbox>
    //           <Button onClick={openPopup}>Add Interviewer</Button>
    //         </CardBody>
    //       </Card>
    //     </div>
    //     <div className="md:block order-last md:order-first mt-10 md:mt-0">
    //       Welcome To The Company Home Page You are Logged in as Google
    //     </div>
    //   </div>
    //   <AddInterviewer isOpen={isPopupOpen} onClose={closePopup} />
    // </>
    <>
      <CompanyNavbar />
      <div className="md:grid md:justify-end md:mt-20 justify-center mt-10 grid-cols-1 md:grid-cols-2  p-5 md:p-0">
        <div className=" md:w-96">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">Interviewers</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              {loading ? (
               <ScaleLoader/>
              ) : interviewers?.length > 0 ? (
                <Listbox
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}>
                  {interviewers.map((interviewer) => (
                    <ListboxItem key={interviewer._id}>{interviewer.email}</ListboxItem>
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
          Welcome To The Company Home Page You are Logged in as Google
        </div>
      </div>
      <AddInterviewer isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default CompanyHome;
