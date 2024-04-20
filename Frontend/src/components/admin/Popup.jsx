import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const Popup = ({ isOpen, onClose,message, id, role }) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (message,id, role) => {
    await axios
      .post(`/api/admin/${role}-${message}`, { id })
      .then((data) => {
        toast(data.data.message);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">
              Are You Sure to {message} ?
            </h2>
            <p className="mb-4">
              You are Preventing the Login access to the {role}
            </p>
            <div className="">
              <Button
                className="m-3"
                onClick={() => {
                  handleAction( message,id, role);
                  onClose();
                }}
              >
                Continue
              </Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
