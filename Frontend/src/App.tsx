import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/common/Landing";
import IntervieweeLogin from "./Pages/intervieweePages/IntervieweeLogin";
import IntervieweeSignup from "./Pages/intervieweePages/IntervieweeSignup";
import AdminLogin from "./Pages/adminPages/AdminLogin";
import { Toaster } from "./components/ui/sonner";
import IntervieweeHome from "./Pages/intervieweePages/IntervieweeHome";
import ForgotPassword from "./Pages/common/ForgotPassword";
import AdminDashboard from "./Pages/adminPages/AdminDashboard";
import CompanyList from "./Pages/adminPages/CompanyList";
import InterviewerList from "./Pages/adminPages/InterviewerList";
import IntervieweeList from "./Pages/adminPages/IntervieweeList";
import ChangePassword from "./Pages/common/ChangePassword";
import ForgotPasswordOTP from "./Pages/common/ForgotPasswordOTP";
import OTP from "./Pages/common/OTP";
import Profile from "./Pages/common/Profile";
import CompanyLogin from "./Pages/companyPages/CompanyLogin";
import CompanySignup from "./Pages/companyPages/CompanySignup";
import CompanyHome from "./Pages/companyPages/CompanyHome";
import InterviewerLogin from "./Pages/interviewerPages/InterviewerLogin";
import InterviewerHome from "./Pages/interviewerPages/InterviewerHome";
import PaymentDone from "./components/company/PaymentDone";
import VideoCall from "./Pages/common/VideoCall";
import Compiler from "./Pages/common/Compiler";
import QandAsession from "./Pages/intervieweePages/QandAsession"
import PageNotFound from "./Pages/common/PageNotFound";
import useAuth from "./customhooks/useAuth";
import 'ldrs/dotStream'


function App() {
  
  const { userData: adminData, loading: adminLoading } = useAuth("admin");
  const { userData: companyData, loading: companyLoading } = useAuth("company");
  const { userData: interviewerData, loading: interviewerLoading } = useAuth("interviewer");
  const { userData: intervieweeData, loading: intervieweeLoading } = useAuth("interviewee");


if (adminLoading || companyLoading || interviewerLoading || intervieweeLoading) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
     <l-dot-stream
  size="60"
  speed="2.5"
  color="black" 
></l-dot-stream>
    </div>
  );
}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/admin/login" element={adminData?<AdminDashboard/>:<AdminLogin/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/company-list" element={<CompanyList/>}/>
          <Route path="/admin/interviewer-list" element={<InterviewerList/>}/>
          <Route path="/admin/interviewee-list" element={<IntervieweeList/>}/>

          <Route path="/interviewee/login" element={intervieweeData?<IntervieweeHome/>:<IntervieweeLogin />} />
          <Route path="/interviewee/signup" element={intervieweeData?<IntervieweeHome/>:<IntervieweeSignup/>}/>
          <Route path="/interviewee" element={<IntervieweeHome/>}/> 
          
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/changePassword" element={<ChangePassword/>}/>
          <Route path="/forgotPassword-otp" element={<ForgotPasswordOTP/>}/>
          <Route path="/otp" element={<OTP/>}/>
          <Route path="/profile" element={<Profile/>}/>

          <Route path="/company/login" element={companyData?<CompanyHome/>:<CompanyLogin/>}/>
          <Route path="/company/signup" element={companyData?<CompanyHome/>:<CompanySignup/>}/>
          <Route path="/company" element={<CompanyHome/>}/>
          <Route path ="/paymentSuccess" element={<PaymentDone/>}/>
          
          <Route path="/interviewer/login" element={interviewerData?<InterviewerHome/>:<InterviewerLogin/>}/>
          <Route path="/interviewer" element={<InterviewerHome/>}/>

          <Route path ="/videocall/:roomId" element={<VideoCall/>}/>
          <Route path ="/compiler"element={<Compiler/>}/>
          <Route path ="/q&a/:questionId"element={<QandAsession/>}/>

          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
      <Toaster className="bg-black" />
    </>
  );
}

export default App;
