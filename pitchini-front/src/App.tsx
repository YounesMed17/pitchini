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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signuprecruter" element={<SignUp />} />
          <Route path="SignUpInterview" element={<SignUpInterview />} />
          <Route path="SignUpfreelancer" element={<SignUpFreelancer />} />
          <Route path="postProject" element={<PostProject />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
