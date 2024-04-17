import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddInterviewer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
 const company= localStorage.getItem("company_token")
  let data = JSON.parse(company)

  const requestData = {
    ...formData,
    userId: data?._id 
};

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/company/add-interviewer", requestData)
      .then((data) => {
        const interviewer = JSON.stringify(data.data);
        localStorage.setItem("interviewer_token",interviewer)
        toast("OTP Sent Successfully")
        navigate("/otp");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Modal isOpen={isOpen} placement="top-center">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Add Interviewer
          </ModalHeader>
          <ModalBody>
            <Input
              onChange={handleChange}
              autoFocus
              label="Email"
              id="email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              onChange={handleChange}
              label="Password"
              id="password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onClick={onClose} type="submit">
              Sign in
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddInterviewer;
