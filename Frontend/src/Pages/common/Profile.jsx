import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "sonner";
import { app } from "@/google/authentication";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const getData = async () => {
    await axios
      .get(`/api/auth/getData`)
      .then((data) => {
        console.log(data);
        setUserData(data.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          toast("Error Occured try Login Agian");
          localStorage.clear();
          navigate("/");
        }
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleFileUpload = async (image) => {
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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/company/updateProfile", formData)
      .then((data) => {
        console.log(data);
        toast("Profile Updated")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <h1 className="text-2xl absolute top-10 left-64 font-serif">{userData?.role}Profie</h1>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 shadow-xl relative">
        <div
          id="profile"
          className="w-full  rounded-lg  shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 relative"
        >
          <form onSubmit={handleSubmit}>
            <input
              ref={fileRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <div className="p-4 md:p-12 text-center ">
              <Avatar
                className="block  rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                onClick={() => fileRef.current.click()}
              >
                <AvatarImage
                  className="cursor-pointer"
                  src={formData.profilePicture || userData?.profile_picture}
                />
              </Avatar>
              <Input
                onChange={handleChange}
                className="w-72 mt-2 ml-40"
                value={formData?.name || userData?.name || ""}
                type="username"
                name="name"
                id="name"
              />
              <Input
                readOnly
                value={userData?.email || ""}
                className="w-72 mt-2 ml-40"
                type="email"
                name="email"
                id="email"
              />
              {userData?.isPremium?(<Input
                readOnly
                className="w-72 mt-2 ml-40"
                value={userData?.isPremium ?"Premium User": "Normal User" ||""}
              />):""}
              <div className="pt-12 pb-8">
                <Button type="submit">Update </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
