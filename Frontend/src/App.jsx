import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/common/Landing";
import CompanyLogin from "./Pages/companyPages/CompanyLogin";
import ComapnySignup from "./Pages/companyPages/ComapnySignup";
import InterviewerLogin from "./Pages/interviewerPages/InterviewerLogin";
import IntervieweeLogin from "./Pages/interweiveePages/IntervieweeLogin";
import IntervieweeSignup from "./Pages/interweiveePages/IntervieweeSignup";
import OTP from "./Pages/common/OTP";
import CompanyHome from "./Pages/companyPages/CompanyHome";
import AdminHome from "./Pages/adminPages/AdminHome";
import AdminNavbar from "./components/admin/AdminNavbar";
import CompanyNavbar from "./components/company/CompanyNavbar";
import ViewerNavbar from "./components/interviewee/ViewerNavbar";
import VieweeNavbar from "./components/interviewer/VieweeNavbar";
import InterviewerHome from "./Pages/interviewerPages/InterviewerHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<Landing />} />
          </Route>
          <Route path="/">
            <Route path="interviewee/login" element={<IntervieweeLogin />} />
            <Route path="interviewee/signup" element={<IntervieweeSignup />} />
            <Route path="interviewer/login" element={<InterviewerLogin />} />
            <Route path="company/login" element={<CompanyLogin />} />
            <Route path="company/signup" element={<ComapnySignup />} />
          </Route>
          <Route path="/company" element={<CompanyNavbar />}>
            <Route index element={<CompanyHome />} />
          </Route>
          <Route path="/admin" element={<AdminNavbar />}>
            <Route index element={<AdminHome />} />
          </Route>
          <Route path="/interviewer" element={<ViewerNavbar />}>
            <Route index element={<InterviewerHome />} />
          </Route>
          <Route path="/interviewee" element={<VieweeNavbar />}>
            
          </Route>
          {/* <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/company-signup" element={<ComapnySignup />} />
          <Route path="/interviewer-login" element={<InterviewerLogin />} />
          <Route path="/interviewee-login" element={<IntervieweeLogin />} />
          <Route path="/interviewee-signup" element={<IntervieweeSignup />} />
          <Route path="/otp" element={<OTP/>}/>
          <Route path="/company-home" element={<CompanyHome/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
