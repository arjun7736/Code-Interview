import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { toast } from "sonner";

const DeleteAndEdit = ({
  isOpen,
  selectedInterviewer,
  setSelectedInterviewer,
  fetchData,
  action,
  onCancel,
}) => {
  const [formData, setformData] = useState({});
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        await axios
        .post("/api/company/edit-interviewer",{...formData,id:selectedInterviewer._id })
        .then((data) => {
          setIsEditModalOpen(false)
          toast("Interviewer Edited Successfully")
        })
        .catch((error) => {
          console.log(error);
          toast(error)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAction = () => {
    if (action == "Delete") {
      handleDelete();
    } else {
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    await axios
      .delete(`/api/company/delete-interviewer/${selectedInterviewer._id}`)
      .then((data) => {
        fetchData();
        setSelectedInterviewer(null);
        toast("Interviewer Deleted")
      })
      .catch((error) => {
        console.log(error);
        toast(error)
      });
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">
              Are You Sure to {action} it?
            </h2>
            <p className="mb-4">After saving You Cant Undo the Action</p>
            <div className="">
              <Button
                className="m-3"
                onClick={() => {
                  handleAction();
                  onCancel();
                }}
              >
                Continue
              </Button>
              <Button onClick={onCancel}>Close</Button>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isEditModalOpen} placement="top-center">
        <ModalContent>
          <>
            <form >
              <ModalHeader className="flex flex-col gap-1">
                Edit Interviewer Details
              </ModalHeader>
              <ModalBody>
                <Input
                  readOnly
                  autoFocus
                  value={selectedInterviewer?.email}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                 <Input
                onChange={handleChange}
                value={formData.name || selectedInterviewer?.name || ""}
                  label="Name"
                  id="name"
                  placeholder="Enter your Name"
                  type="username"
                  variant="bordered"
                />
                <Input
                onChange={handleChange}
                value={selectedInterviewer?.password}
                  label="Password"
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Close
                </Button>
                <Button type="button"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAndEdit;
