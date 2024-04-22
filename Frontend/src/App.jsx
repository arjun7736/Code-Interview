import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Pages/common/Landing";
import CompanyLogin from "./Pages/companyPages/CompanyLogin";
import ComapnySignup from "./Pages/companyPages/ComapnySignup";
import InterviewerLogin from "./Pages/interviewerPages/InterviewerLogin";
import IntervieweeLogin from "./Pages/interweiveePages/IntervieweeLogin";
import IntervieweeSignup from "./Pages/interweiveePages/IntervieweeSignup";
import OTP from "./Pages/common/OTP";
import CompanyHome from "./Pages/companyPages/CompanyHome";
import AdminHome from "./Pages/adminPages/AdminHome";
import InterviewerHome from "./Pages/interviewerPages/InterviewerHome";
import IntervieweeHome from "./Pages/interweiveePages/IntervieweeHome";
import { Toaster } from "./components/ui/sonner";
import ForgetPassword from "./Pages/common/ForgetPassword";
import AdminLogin from "./Pages/adminPages/AdminLogin";
import IntervieweeList from "./Pages/adminPages/IntervieweeList";
import InterviewerList from "./Pages/adminPages/InterviewerList";
import CompanyList from "./Pages/adminPages/CompanyList";
import ForgotPasswordOTP from "./Pages/common/ForgotPasswordOTP";
import ChangePassword from "./Pages/common/ChangePassword";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/interviewee/login" element={<IntervieweeLogin />} />
          <Route path="/interviewee/signup" element={<IntervieweeSignup />} />
          <Route path="/interviewer/login" element={<InterviewerLogin />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<ComapnySignup />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="/forgotPassword-otp" element={<ForgotPasswordOTP/>}/>
          <Route path ="/changePassword" element={<ChangePassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/company" element={<CompanyHome />} />
          <Route path="/admin/dashboard" element={<AdminHome/>} />
          <Route path="/interviewer" element={<InterviewerHome />} />
          <Route path="/interviewee" element={<IntervieweeHome/>}/>     
          <Route path="/admin/interviewee-list" element={<IntervieweeList/>}/>
          <Route path="/admin/interviewer-list" element ={<InterviewerList/>}/>
          <Route path="/admin/company-list" element={<CompanyList/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster className="bg-black" />
    </>
  );
}

export default App;
