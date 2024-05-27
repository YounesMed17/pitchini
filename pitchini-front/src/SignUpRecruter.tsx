import { ChangeEvent, FunctionComponent, useState, useCallback } from "react";
import { Button } from "@mui/material";

import Navbar from "./components/Navbar";
import SignUpSecondHeader from "./components/SecondHeader";
import FormInput from "./components/FormInput";
import { useNavigate } from "react-router-dom";
import { send } from "./utilFunctions/sendData";
import {
  validateEmail,
  validateNotEmpty,
  validatePassword,
} from "./utilFunctions/ValidateFunction";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SignUp: FunctionComponent = () => {
  const [first_name, setfirst_name] = useState<string>("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const navigate = useNavigate();
  const navigating = useCallback(() => {
    navigate("/signupinterview", {
      state: { first_name, last_name },
    });
  }, [navigate, first_name, last_name]);

  const [step, setstep] = useState("01");

  const [isNextClicked, setIsNextClicked] = useState(false);
  let first = true;
  let last = true;
  let Email = true;
  let Password = true;
  let ConfirPassword = true;
  let nickName = true;
  if (!isNextClicked) {
    last = false;
    Email = false;
    Password = false;
    ConfirPassword = false;
    nickName = false;
  }

  if (isNextClicked) {
    if (!validateNotEmpty(first_name)) {
      first = true;
    } else first = false;

    if (!validateNotEmpty(last_name)) {
      last = true;
    } else last = false;

    if (
      !validateNotEmpty(nickname) ||
      nickname.includes(last_name) ||
      nickname.includes(first_name)
    ) {
      nickName = true;
    } else nickName = false;

    if (!validateEmail(email)) {
      Email = true;
    } else Email = false;
    !validatePassword(password) ? (Password = true) : (Password = false);
    password != confirmPassword
      ? (ConfirPassword = true)
      : (ConfirPassword = false);
  }

  function validation() {
    setIsNextClicked(true);
    if (!last && !first && !Email && !nickName && !Password && !ConfirPassword)
      setstep("02");

    if (step == "02") {
      const formData = {
        first_name,
        last_name,
        email,
        password,
        nickname,
        role: "client",
        avatar: "/user.png",
      };
      // Send POST request to backend
      send(
        true,
        formData,
        navigating,
        "http://localhost:3001/api/user/inscriptionUser"
      );
    }
  }

  return (
    <div className="w-full relative flex flex-row items-start justify-start tracking-[normal]">
      <main className="h-[2129px] flex-1 bg-white flex flex-col items-start justify-start pt-0 px-0 pb-[69px] box-border gap-[72px] max-w-full text-left text-[16.4px] text-gray-3 font-join-text lg:pb-5 lg:box-border mq450:gap-[18px_72px] mq750:h-auto mq750:gap-[36px_72px]">
        <Navbar />
        <section className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[6062.700000000001px] box-border max-w-full shrink-0 text-left text-44xl text-grey font-join-text lg:pb-[1665px] lg:box-border mq450:pb-[703px] mq450:box-border mq1050:pb-[1082px] mq1050:box-border">
          <div className="w-[972px] flex flex-col items-start justify-start gap-[77px] max-w-full mq750:gap-[19px_77px] mq1050:gap-[38px_77px]">
            <SignUpSecondHeader
              path="/login02-converti02-1@2x.png"
              title2="Are you using PITCHINI as a Recruiter or a Freelancer ?"
              title1=" Create your PITCHINI Account"
              showButtons={true}
              relatedTo="recruiter"
            />
            <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[85px] box-border gap-[78px] max-w-full text-13xl text-blue mq450:pb-9 mq450:box-border mq750:gap-[19px_78px] mq1050:gap-[39px_78px] mq1050:pb-[55px] mq1050:box-border">
              <div className="self-stretch flex flex-col items-start justify-start gap-[21px] max-w-full">
                <FormInput
                  placeHolder="First Name"
                  type="text"
                  value={first_name}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setfirst_name(e.target.value)}
                  message="first name is required"
                  errorStatus={isNextClicked ? first : false}
                  textArea={false}
                />

                <FormInput
                  placeHolder="Last Name"
                  type="text"
                  value={last_name}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setlast_name(e.target.value)}
                  message="last name is required"
                  errorStatus={last}
                  textArea={false}
                />

                <FormInput
                  placeHolder="NickName"
                  type="text"
                  value={nickname}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setNickName(e.target.value)}
                  message={
                    nickname == ""
                      ? "NickName is required"
                      : "you can't include first name or last in nickName "
                  }
                  errorStatus={nickName}
                  textArea={false}
                />

                <FormInput
                  placeHolder="Email"
                  type="email"
                  value={email}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setEmail(e.target.value)}
                  message={
                    email == "" ? "email is required" : "email form is wrong"
                  }
                  errorStatus={Email}
                  textArea={false}
                />

                <FormInput
                  placeHolder="Password"
                  type="password"
                  value={password}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setPassword(e.target.value)}
                  message={
                    password == ""
                      ? "Password is required"
                      : " Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                  }
                  errorStatus={Password}
                  textArea={false}
                />

                <FormInput
                  placeHolder="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setConfirmPassword(e.target.value)}
                  message={
                    confirmPassword == ""
                      ? "Password is required"
                      : "Confirmed password do not match the password"
                  }
                  errorStatus={ConfirPassword}
                  textArea={false}
                />
              </div>

              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                <div className=" flex flex-row items-center justify-center gap-[70px] max-w-full mq450:flex-wrap mq450:gap-[70px_35px]">
                  <Button
                    className="w-[150px]"
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    onClick={validation}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5 text-[16px] text-gray-3">
              <div className="relative font-medium">
                Copyright © PITCHINI 2024
              </div>
            </div>
          </div>
        </section>
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[860px] mq450:pl-5 mq450:box-border mq750:pl-[215px] mq750:box-border mq1050:pl-[430px] mq1050:box-border">
          <div className="h-[25px] w-[164px] relative font-medium inline-block">
            Digidop ©Copyright
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
