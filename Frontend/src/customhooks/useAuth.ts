import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuth = (role: string) => {
  const [loading, setLoading] = useState(true);
  const { adminData } = useSelector((state: RootState) => state.admin);
  const { companyData } = useSelector((state: RootState) => state.company);
  const { interviewerData } = useSelector((state: RootState) => state.interviewer);
  const { intervieweeData } = useSelector((state: RootState) => state.interviewee);

  useEffect(() => {
    setLoading(false);
  }, [adminData, companyData, interviewerData, intervieweeData]);

  const getUserData = () => {
    switch (role) {
      case "admin":
        return adminData;
      case "company":
        return companyData;
      case "interviewer":
        return interviewerData;
      case "interviewee":
        return intervieweeData;
      default:
        return null;
    }
  };

  return { userData: getUserData(), loading };
};

export default useAuth;