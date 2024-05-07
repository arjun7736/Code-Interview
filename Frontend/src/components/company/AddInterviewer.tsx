import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { setUserRole } from "@/redux/slices/tempSlice";

const AddInterviewer: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Interviewer>({
    email: "",
    password: "",
  });
  const { companyData } = useSelector((state: RootState) => state.company);
  
  const requestData = {
    ...formData,
    userId: companyData?._id,

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(
        "/api/company/add-interviewer",
        requestData
      );
      toast("OTP Sent Successfully");
      dispatch(setUserRole({role:"interviewer",email:formData.email}))
      navigate("/otp");
    } catch (error) {
      toast(error.response.data)
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast("Error Occured try Login Agian");
      } else {
        console.error(error);
      }
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 overflow-y-auto top-0 w-full left-0 "
          id="modal"
        >
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <form >
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <div
                className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <Label className="font-medium text-gray-800">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter the Email"
                    onChange={handleChange}
                    className="w-full  rounded bg-gray-100 p-2 mt-2 mb-3"
                  />
                  <Label className="font-medium text-gray-800">Password</Label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter the Password"
                    onChange={handleChange}
                    className="w-full  rounded bg-gray-100 p-2 mt-2 mb-3"
                  />
                </div>
                <div className=" px-4 py-3 text-right">
                  <Button
                    type="submit"
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={onClose}
                  >
                 Cancel
                  </Button>
                  <Button
                    className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
                    onClick={handleSubmit}
                    type="button"
                  >
                   Create
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInterviewer;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
interface Interviewer {
  email: string;
  password: string;
}
