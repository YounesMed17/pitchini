import SignUpInterview from "./SignUpInterview";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpFreelancer from "./SignUpFreelancer";
import SignUp from "./SignUpRecruter";
import PostProject from "./PostProject";
import Dashboard from "./Dashboard";
import Charts from "./components/Charts";
//import Charts from "./components/Charts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signuprecruter" element={<SignUp />} />
          <Route path="SignUpInterview" element={<SignUpInterview />} />
          <Route path="SignUpfreelancer" element={<SignUpFreelancer />} />
          <Route path="postProject" element={<PostProject />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chart" element={<Charts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
