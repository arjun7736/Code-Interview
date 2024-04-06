import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/common/Landing";
import CompanyLogin from "./Pages/companyPages/CompanyLogin";
import ComapnySignup from "./Pages/companyPages/ComapnySignup";
import InterviewerLogin from "./Pages/interviewerPages/InterviewerLogin";
import IntervieweeLogin from "./Pages/interweiveePages/IntervieweeLogin";
import IntervieweeSignup from "./Pages/interweiveePages/IntervieweeSignup";
import OTP from "./Pages/common/OTP";
import CompanyHome from "./Pages/companyPages/CompanyHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/company-signup" element={<ComapnySignup />} />
          <Route path="/interviewer-login" element={<InterviewerLogin />} />
          <Route path="/interviewee-login" element={<IntervieweeLogin />} />
          <Route path="/interviewee-signup" element={<IntervieweeSignup />} />
          <Route path="/otp" element={<OTP/>}/>
          <Route path="/company-home" element={<CompanyHome/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
