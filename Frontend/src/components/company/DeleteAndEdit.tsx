import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { toast } from "sonner";

const DeleteAndEdit: React.FC<Props> = ({
  isOpen,
  action,
  onCancel,
  selectedInterviewer,
  fetchData,
  setSelectedInterviewer,
}) => {
  const [formData, setFormData] = useState<Partial<Interviewer>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://13.233.229.71/api/company/edit-interviewer", {
        ...formData,
        id: selectedInterviewer?._id,
      });
      setIsEditModalOpen(false);
      toast("Interviewer Edited Successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.message);
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast("Error Occured try Login Agian");
          localStorage.removeItem("company_token");
          window.location.href = "/";
        }
      } else {
        toast("unexpected Error Occures");
      }
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAction = () => {
    if (action === "Delete") {
      handleDelete();
    } else {
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/company/delete-interviewer/${selectedInterviewer?._id}`
      );
      fetchData();
      setSelectedInterviewer(null);
      toast("Interviewer Deleted");
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast(error.message);
      }else{
        toast("unexpected Error Occures");
      }
    }
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
      <>
        {isEditModalOpen && (
          <div
            className="fixed z-10 overflow-y-auto top-0 w-full left-0 "
            id="modal"
          >
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <form>
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
                      readOnly
                      autoFocus
                      value={selectedInterviewer?.email}
                      className="w-full  rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                    <Label className="font-medium text-gray-800">name</Label>
                    <Input
                      value={formData.name || selectedInterviewer?.name || ""}
                      id="name"
                      placeholder="Enter your Name"
                      type="username"
                      onChange={handleChange}
                      className="w-full  rounded bg-gray-100 p-2 mt-2 mb-3"
                    />
                    <Label className="font-medium text-gray-800">
                      Password
                    </Label>
                    <Input
                      onChange={handleChange}
                      className="w-full  rounded bg-gray-100 p-2 mt-2 mb-3"
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>
                  <div className=" px-4 py-3 text-right">
                    <Button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
                      onClick={handleSubmit}
                      type="button"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
      {/* <Modal isOpen={isEditModalOpen} placement="top-center">
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
                // value={formData.password || selectedInterviewer?.password || ""}
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
                 Update
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default DeleteAndEdit;

interface Props {
  isOpen: boolean;
  action: string;
  onCancel: () => void;
  selectedInterviewer: Interviewer | null;
  fetchData: () => Promise<void>;
  setSelectedInterviewer: (interviewer: Interviewer | null) => void;
}
interface Interviewer {
  _id: string;
  email: string;
  name?: string;
  profile_picture?: string;
}
