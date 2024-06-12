import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Avatar, AvatarImage } from "./ui/avatar";
import { app } from "@/google/authentication";
import { Input } from "./ui/input";

const ProfileCard = () => {
  const { companyData } = useSelector((state: RootState) => state.company);
  const { intervieweeData } = useSelector(
    (state: RootState) => state.interviewee
  );
  const { interviewerData } = useSelector(
    (state: RootState) => state.interviewer
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
  const [formData, setFormData] = useState({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [userData, setUserData] = useState<FormData | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".ProfileCard") &&
        !event.target.closest("#ProfileCard")
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`/api/auth/getData`);
      setUserData(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        toast("Error Occurred. Please Login Again");
        navigate("/");
      } else {
        console.error(error);
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.round(progress));
      },
      (error) => {
        console.error(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        } catch (error) {
          console.error(error);
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
      .post(`/api/${data}/updateProfile`, formData)
      .then((data) => {
        setUserData(data.data);
        toast("Profile Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return isVisible ? (
    <div className={`ProfileCard ${isVisible? 'visible' : 'hidden'} flex flex-col items-center justify-center min-h-screen bg-transparent`} onClick={() => setIsVisible(false)}>

      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
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
          <div className="wrapper max-w-sm p-5 rounded-lg shadow-2xl bg-gray-800 text-white">
            <div className="flex flex-col items-center mt-10 relative text-center ">
              <Avatar
                onClick={() => fileRef?.current?.click?.()}
                className="w-32 h-32 my-3"
              >
                <AvatarImage
                  className="cursor-pointer w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
                  src={formData.profile_picture || userData?.profile_picture}
                />
              </Avatar>
              <Input
              onChange={handleChange}
                className=" text-2xl font-semibold text-black bg-transparent outline-none border-0 text-center"
                value={formData?.name || userData?.name || ""}
              />
              <Input
              readOnly
                className="title text-gray-400 text-sm lowercase mt-1  bg-transparent outline-none border-0 text-center"
                value={userData?.email || ""}
              />
              {userData?.isPremium ? (
                <Input
                  readOnly
                  className="title text-gray-400 text-sm lowercase mt-1  bg-transparent outline-none border-0 text-center"
                  value={
                    userData?.isPremium ? "Premium User" : "Normal User" || ""
                  }
                />
              ) : (
                ""
              )}
              <Button
                type="submit"
                className=" mt-6 px-5 py-2 rounded-full text-white bg-gradient-to-r bg-blue-400 shadow-md"
              >
                {Object.keys(formData).length > 0 ? "Update" : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ProfileCard;
