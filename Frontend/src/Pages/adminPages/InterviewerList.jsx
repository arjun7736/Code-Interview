import React, { useEffect, useState } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { setInterviewerData } from "@/redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Popup from "@/components/admin/Popup";
import { Button } from "@/components/ui/button";

const InterviewerList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/admin/interviewer-data")
      .then((data) => {
        dispatch(setInterviewerData(data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const { interviewerData } = useSelector((state) => state.admin);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupId, setPopupId] = useState(null);
  const [user, setUser] = useState(null);


  const openPopup = (message, id,user) => {
    setIsPopupOpen(true);
    setPopupMessage(message);
    setPopupId(id);
    setUser(user);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage("");
    setPopupId(null);
    setUser(null);
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <div className="w-1/6">
          <AdminSidebar />
        </div>
        <div className="flex flex-col flex-grow md:ml-32" >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interviewer Name</TableHead>
                <TableHead>Interviewer E-mail</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviewerData?.map((data) => (
                <TableRow key={data._id}>
                  <TableCell className="font-medium">{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                    {data.isBlocked ? (
                        <Button
                          className="h-6 mx-3"
                          onClick={() =>
                            openPopup("unblock", data._id, "interviewer")
                          }
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          className="h-6 mx-3"
                          onClick={() =>
                            openPopup("block", data._id, "interviewer")
                          }
                        >
                          Block
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        message={popupMessage}
        id={popupId}
        role={user}
      />
    </>
  );
};

export default InterviewerList;
