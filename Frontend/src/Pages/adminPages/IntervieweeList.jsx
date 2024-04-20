import React, { useEffect, useState } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { setIntervieweeData } from "@/redux/slices/adminSlice";
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
import { Button } from "@/components/ui/button";
import Popup from "@/components/admin/Popup";

const IntervieweeList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/admin/interviewee-data")
      .then((data) => {
        dispatch(setIntervieweeData(data.data));
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          toast("Error Occured try Login Agian");
          localStorage.removeItem("admin_token");
          window.location.reload()
        }
      });
  });
  const { intervieweeData } = useSelector((state) => state.admin);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupId, setPopupId] = useState(null);
  const [user, setUser] = useState(null);

  const openPopup = (message, id,user) => {
    setIsPopupOpen(true);
    setPopupMessage(message);
    setUser(user);
    setPopupId(id);
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
        <div className="flex flex-col flex-grow md:ml-32">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interviewee Name</TableHead>
                <TableHead>Interviewee E-mail</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intervieweeData?.map((data) => (
                <TableRow key={data._id}>
                  <TableCell className="font-medium">{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                    {data.isBlocked ? (
                        <Button
                          className="h-6 mx-3"
                          onClick={() =>
                            openPopup("unblock", data._id, "interviewee")
                          }
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          className="h-6 mx-3"
                          onClick={() =>
                            openPopup("block", data._id, "interviewee")
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

export default IntervieweeList;
