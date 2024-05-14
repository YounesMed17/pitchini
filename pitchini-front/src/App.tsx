import SignUpInterview from "./SignUpInterview";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpFreelancer from "./SignUpFreelancer";
import SignUp from "./SignUpRecruter";
import PostProject from "./PostProject";
//import Dashboard from "./Dashboard";
//import PortfolioRecruiter from "./Portfolio";
import PopUpButton from "./PopUpButton";
import FormAplication from "./components/FormAplication";
import Dashboard from "./freelancerDashboard";
import Dashboard2 from "./testComp";
import Slider from "./Slider";
import RecruiterDashboard from "./RecruiterDashboard";
import FreelancersList from "./FreelancersList";
import Portfolio from "./Portfolio";
import ImageViewer from "./components/PopUpSubmitJob";
import FileUploader from "./components/upload";
import Rate from "./components/RatingPopup";
import SuccessfulPayment from "./components/SuccessfulPayment";
import FailedPayment from "./components/FailedPayment";
import { useEffect, useState } from "react";
import { get } from "./utilFunctions/getData";
import UploadForm from "./UploadForm";
function App() {
  const [userStatus, setUserStatus] = useState({ status: "", role: "" });

  const localStorageId = localStorage.getItem("userId");
  const userId = parseInt(localStorageId, 10);
  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/user/${userId}`);

      setUserStatus({ status: res.status, role: res.role });
    }

    fetchData();
  }, []);
  function chekcUserStatus() {
    return userStatus.status !== "suspended";
  }

  function Suspended() {
    return (
      <div className="flex flex-col mt-[10%] justify-center items-center">
        <h1 className="text-orange text-center">
          You are Suspended<br></br> You can't access anything on the plateforme
        </h1>
        <h2 className="text-[#4B5563] opacity-80">
          If you think that we made a mistake please send us an email :
          contact@pitchini.com
        </h2>
      </div>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signuprecruter" element={<SignUp />} />
          <Route path="SignUpInterview" element={<SignUpInterview />} />
          <Route path="SignUpfreelancer" element={<SignUpFreelancer />} />
          <Route
            path="postProject/:userId"
            element={chekcUserStatus() ? <PostProject /> : Suspended()}
          />
          <Route path="Freelancerdashboard" element={<Dashboard />} />
          <Route path="popup" element={<PopUpButton />} />
          <Route path="form" element={<FormAplication />} />
          <Route path="dashboard2" element={<Dashboard2 />} />
          <Route path="Recruiterdashboard" element={<RecruiterDashboard />} />
          <Route path="FreelancersList" element={<FreelancersList />} />
          <Route path="FreelancerPortfolio/:userId" element={<Portfolio />} />
          <Route path="img" element={<ImageViewer />} />
          <Route path="up" element={<FileUploader />} />
          <Route path="slide" element={<Slider />} />
          <Route path="rate" element={<Rate />} />
          <Route path="successfulPayment" element={<SuccessfulPayment />} />
          <Route path="failedPayment" element={<FailedPayment />} />

          <Route path="UploadForm" element={<UploadForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
