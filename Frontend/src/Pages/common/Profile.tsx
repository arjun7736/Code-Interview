import axios from "axios";
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/google/authentication";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Light, MainBackGround, ThirdBG } from "@/lib/Color";

const Profile = () => {
  const { companyData } = useSelector((state: RootState) => state.company);
  const { intervieweeData } = useSelector(
    (state: RootState) => state.interviewee
  );

  let data: null | string = null;
  if (companyData) {
    data = "company";
  } else if (intervieweeData) {
    data = "interviewee";
  } else {
    data = "interviewer";
  }
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    profilePicture?: string;
    name?: string;
  }>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [userData, setUserData] = useState<{
    profile_picture?: string;
    name?: string;
    email?: string;
    isPremium?: boolean;
  }>({});

  const getData = async () => {
    try {
      const response = await axios.get(`http://13.233.229.71/api/auth/getData`);
      setUserData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast("Error Occurred. Please Login Again");
        navigate("/");
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      () => {
        toast("error occured");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData({ ...formData, profilePicture: downloadURL });
        } catch (error) {
          toast("error occured");
        }
      }
    );
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(`http://13.233.229.71/api/${data}/updateProfile`, formData)
      .then((res) => {
        setUserData(res.data);
        toast("Profile Updated Successfully");
        setFormData({});
        navigate(`/${data}`);
      })
      .catch(() => {
        toast("Unexpected error Occured");
      });
  };

  return (
    <div
      style={{ backgroundColor: ThirdBG }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="text-center">
        <div
          className="max-w-4xl h-auto flex-wrap mx-auto my-32 lg:my-0"
          style={{ backgroundColor: ThirdBG }}
        >
          <div
            style={{ backgroundColor: Light }}
            id="profile"
            className=" rounded-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 w-[50vw]"
          >
            <form onSubmit={handleSubmit}>
              <input
                ref={fileRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  setImage(e?.target?.files?.[0]);
                }}
              />
              <div className="p-4 md:p-12 text-center">
                <Avatar
                  className="block rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                  onClick={() => fileRef?.current?.click?.()}
                >
                  <AvatarImage
                    className="cursor-pointer"
                    src={formData.profilePicture || userData?.profile_picture}
                  />
                </Avatar>
                <Input
                  onChange={handleChange}
                  className="w-72 mt-2 mx-auto"
                  value={formData?.name || userData?.name || ""}
                  type="username"
                  name="name"
                  id="name"
                />
                <Input
                  readOnly
                  value={userData?.email || ""}
                  className="w-72 mt-2 mx-auto"
                  type="email"
                  name="email"
                  id="email"
                />
                {userData?.isPremium && (
                  <Input
                    readOnly
                    className="w-72 mt-2 mx-auto"
                    value={
                      userData?.isPremium ? "Premium User" : "Normal User" || ""
                    }
                  />
                )}
                <div className="pt-12 pb-8">
                  <Button
                    type="submit"
                    style={{ backgroundColor: MainBackGround }}
                  >
                    {Object.keys(formData).length > 0 ? "Update" : "Edit"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile
