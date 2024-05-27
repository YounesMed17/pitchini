import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  validateEmail,
  validateNotEmpty,
} from "./utilFunctions/ValidateFunction";
import Login1 from "./components/Login1";
import FrameComponent11 from "./components/Framecomponent11";
import CopyrightPitchini from "./components/CopyrightPitchini";

const LoginFreelancer: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    setErrorMessage("");
    setNumber(0);
    if (!validateNotEmpty(email) && !validateNotEmpty(password)) {
      setNumber(1);
      setErrorMessage("Email and password are required");
      return;
    } else if (!validateEmail(email)) {
      setNumber(2);
      setErrorMessage("Veuillez saisir une adresse e-mail valide.");
      return;
    } else if (!validateNotEmpty(password)) {
      setNumber(3);
      setErrorMessage("Veuillez saisir un mot de passe.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token, id } = responseData;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        getUserInfo();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }

    setEmail("");
    setPassword("");
  }, [email, password, navigate]);

  const getUserInfo = useCallback(async () => {
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
          if (userInfo.role === "client") {
            navigate("/Recruiterdashboard");
          } else if (userInfo.role === "freelancer") {
            navigate("/Freelancerdashboard");
          }
        } else {
          console.error("Failed to get user information:", response.statusText);
        }
      } else {
        console.error("Token not found.");
      }
    } catch (error) {
      console.error("Failed to get user information:", error);
    }
  }, [navigate]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const onLogoPitchini1Click = useCallback(() => {
    // Please sync "Home Page" to the project
  }, []);

  const onContactTextClick = useCallback(() => {
    // Please sync "Contact Page " to the project
  }, []);

  const onLoginTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtonContainerClick = useCallback(() => {
    // Please sync "Joint Freelancer  p1" to the project
  }, []);

  const onRectangleClick = useCallback(() => {
    navigate("/login-recruiter");
  }, [navigate]);

  const onRecruiterTextClick = useCallback(() => {
    navigate("/login-recruiter");
  }, [navigate]);
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[39px] box-border gap-[72px] tracking-[normal] mq450:gap-[18px_72px] mq975:gap-[36px_72px]">
      <Navbar
        frameHeaderAlignSelf="stretch"
        frameHeaderFlex="unset"
        onLogoPitchini1Click={onLogoPitchini1Click}
        onContactTextClick={onContactTextClick}
        onLoginTextClick={onLoginTextClick}
        onButtonContainerClick={onButtonContainerClick}
      />
      <main className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <section className="w-[972px] flex flex-col items-end justify-start gap-[77px] max-w-full text-center text-66xl text-grey1 font-titre-grey mq700:gap-[19px_77px] mq975:gap-[38px_77px]">
          <div className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-[5px] box-border max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-[17px] max-w-full">
              <Login1
                title="Login the Pitchini"
                description="Are you using PITCHINI as a Recruiter or a Freelancer ?"
                imageUrl="/login02-converti02-1@2x.png"
              />
              {}{" "}
              <FrameComponent11
                propBorderr="3px solid #2f80ed"
                propColorr="#2f80ed"
                onRectangle2Click={onRectangleClick}
                onRecruiterTextClick={onRecruiterTextClick}
              />
            </div>
          </div>
          <CopyrightPitchini
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            number={number}
            setNumber={setNumber}
          />
        </section>
      </main>
    </div>
  );
};

export default LoginFreelancer;
