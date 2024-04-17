import React, { useEffect, useState } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { setCompanydata } from "@/redux/slices/adminSlice";
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
import Popup from "@/components/Popup";
const CompanyList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/admin/company-data")
      .then((data) => {
        dispatch(setCompanydata(data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const { companyData } = useSelector((state) => state.admin);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupId, setPopupId] = useState(null);
  const [user, setUser] = useState(null);
  const [message,setMessage]=useState("")

  const openPopup = (message, id, user) => {
    setIsPopupOpen(true);
    setPopupId(id);
    setUser(user);
    setMessage(message)
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupId(null);
    setUser(null);
    setMessage("")
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
                <TableHead>Company Name</TableHead>
                <TableHead>Comapany E-mail</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyData?.map((data) => (
                <TableRow key={data._id}>
                  <TableCell className="font-medium">{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {data.isBlocked ? (
                        <Button
                          className="h-6 mx-3"
                          onClick={() =>
                            openPopup("unblock", data._id, "company")
                          }
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          className="h-6 mx-3"
                          onClick={() =>
                            openPopup("block", data._id, "company")
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
        id={popupId}
        role={user}
        message={message}
      />
    </>
  );
};

export default CompanyList;
