import SignUpInterview from "./SignUpInterview";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignUpFreelancer from "./SignUpFreelancer";
import SignUp from "./SignUpRecruter";
import PostProject from "./PostProject";
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
import UploadForm from "./UploadForm";
import Products from "./Products";
import SearchJob from "./SearchJob";
import LoginFreelancer from "./LoginFreelancer";
import Login from "./Login";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (token) {
        const response = await fetch(`http://localhost:3001/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          setRole(userInfo.role);
          setStatus(userInfo.status);
        } else {
          console.error("Failed to get user information:", response.statusText);
        }
      } else {
        console.error("Token not found.");
      }
    } catch (error) {
      console.error("Failed to get user information:", error);
    }
  };
  setInterval(
    () => {
      getUserInfo();
    },
    role == "" ? 1000 : 5000
  );
  const [timeoutReached, setTimeoutReached] = useState(false);

  function checkTimer() {
    if (role === "") {
      const timer = setTimeout(() => {
        role == "" ? setTimeoutReached(true) : setTimeoutReached(false);
      }, 3000); // 10 seconds
    }
    return () => clearTimeout(timer);
  }

  //localStorage.clear();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signuprecruter" element={<SignUp />} />
        <Route path="SignUpInterview" element={<SignUpInterview />} />
        <Route path="SignUpfreelancer" element={<SignUpFreelancer />} />
        <Route path="postProject/:userId" element={<PostProject />} />
        <Route
          path="Freelancerdashboard"
          element={
            status !== "suspended" && role === "freelancer" ? (
              <Dashboard />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div> // Redirect to login if role is empty
            ) : checkTimer() && timeoutReached ? (
              <h1 className="text-[red] text-center mt-[21%]">
                You are not allowed here
              </h1>
            ) : (
              ""
            )
          }
        />

        <Route
          path="Recruiterdashboard"
          element={
            status !== "suspended" && role === "client" ? (
              <RecruiterDashboard />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div> // Redirect to login if role is empty
            ) : checkTimer() && timeoutReached ? (
              <h1 className="text-[red] text-center mt-[21%]">
                You are not allowed here
              </h1>
            ) : (
              ""
            )
          }
        />
        <Route path="popup" element={<PopUpButton />} />
        <Route path="form" element={<FormAplication />} />
        <Route path="dashboard2" element={<Dashboard2 />} />

        <Route path="FreelancersList/:id" element={<FreelancersList />} />
        <Route path="FreelancerPortfolio/:userId" element={<Portfolio />} />
        <Route path="img" element={<ImageViewer />} />
        <Route path="up" element={<FileUploader />} />
        <Route path="slide" element={<Slider />} />
        <Route path="rate" element={<Rate />} />
        <Route path="successfulPayment" element={<SuccessfulPayment />} />
        <Route path="failedPayment" element={<FailedPayment />} />
        <Route path="UploadForm" element={<UploadForm />} />
        <Route path="Products" element={<Products />} />
        <Route path="/searchJob/:id" element={<SearchJob />} />
        <Route path="/login-freelancer" element={<LoginFreelancer />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
