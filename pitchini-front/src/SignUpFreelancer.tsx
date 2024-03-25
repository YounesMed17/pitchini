import { ChangeEvent, FunctionComponent, useCallback, useState } from "react";
import { Button } from "@mui/material";
import TimeLine from "./components/TimeLine";
import FormInput from "./components/FormInput";
import {
  send,
  validateEmail,
  validateNotEmpty,
  validatePassword,
} from "./ValidateFunction";
import { useNavigate } from "react-router-dom";
import EnTete from "./components/EnTete";

const JointFreelancerP: FunctionComponent = () => {
  const [first_name, setfirst_name] = useState<string>("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("1");
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState("");
  let ok = false;
  const navigate = useNavigate();

  const navigating = useCallback(() => {
    navigate("/signupinterview", {
      state: { first_name, last_name },
    });
  }, [navigate, first_name, last_name]);

  function validation() {
    if (number == "1") {
      if (
        validateEmail(email) &&
        validateNotEmpty(first_name) &&
        validateNotEmpty(last_name) &&
        validateNotEmpty(nickname)
      ) {
        setNumber("2");
      } else alert("inputs are wrong");
    } else if (number == "2") {
      if (
        validateNotEmpty(domain) &&
        validateNotEmpty(skills) &&
        selectedFile != null
      ) {
        setNumber("3");
      }
    } else if (
      number == "3" &&
      validatePassword(password) &&
      password == confirmPassword
    ) {
      ok = true;
    } else alert("inputs wrong");
    if (number == "3" && ok == true) {
      const formData = {
        first_name,
        last_name,
        email,
        nickname,
        role: "freelancer",
        password,
      };
      // Send POST request to backend
      send(
        formData,
        navigating,
        "http://localhost:3001/api/user/inscriptionUser"
      );
    }
  }
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Upload the file or perform any other actions
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      // Upload the dropped file or perform any other actions
    }
  };
  const showenInput =
    "flex-1 flex flex-col items-start justify-start gap-[21px] max-w-full ";
  const hiddenInput =
    "flex-1 flex flex-col items-start justify-start gap-[21px] max-w-full hidden ";

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[57px] box-border gap-[81.40000000000146px] tracking-[normal] mq1000:gap-[41px_81.4px] mq450:gap-[20px_81.4px]">
      <EnTete></EnTete>
      <main className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5 box-border max-w-full">
        <section className="w-[1063.3px] flex flex-col items-start justify-start gap-[77px] max-w-full text-left text-44xl text-grey2 font-titre-grey mq1050:gap-[38px_77px] mq725:gap-[19px_77px]">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[49px] pl-[51px] box-border max-w-full shrink-0 text-center mq1050:pl-[25px] mq1050:pr-6 mq1050:box-border">
            <div className="flex-1 flex flex-col items-start justify-start gap-[8.400000000001455px] max-w-full">
              <h1 className="m-0 self-stretch relative text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000] z-[1] mq1000:text-31xl mq450:text-19xl">
                Create your PITCHINI Account
              </h1>
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-[30px] box-border max-w-full text-6xl">
                <div className="flex-1 flex flex-col items-start justify-start gap-[59px] max-w-full mq450:gap-[29px_59px]">
                  <div className="self-stretch relative leading-[37px] font-medium mq450:text-xl mq450:leading-[29px]">
                    Are you using PITCHINI as a Recruiter or a Freelancer ?
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                    <img
                      className="w-[645px] relative max-h-full object-cover max-w-full"
                      loading="lazy"
                      alt=""
                      src="/login02-converti02-1@2x.png"
                    />
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                    <div className="w-[595px] flex flex-row items-start justify-center gap-[9px] max-w-full mq725:flex-wrap">
                      <Button
                        className="h-[79px] flex-[0.4573] min-w-[190px] mq725:flex-1"
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          color: "#2f80ed",
                          fontSize: "28",
                          background: "#fff",
                          borderRadius: "6px",
                          "&:hover": { background: "#fff" },
                          height: 79,
                        }}
                      >
                        Freelancer
                      </Button>
                      <Button
                        className="h-[79px] flex-1 relative min-w-[190px] mq725:flex-1"
                        disableElevation={true}
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          color: "#c4c4c4",
                          fontSize: "28",
                          background: "#fff",
                          borderRadius: "6px",
                          "&:hover": { background: "#fff" },
                          height: 79,
                        }}
                      >
                        Recruiter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start pt-0 pb-1.5 pr-[41px] pl-[46px] box-border max-w-full text-13xl text-blue-1 mq1050:pl-[23px] mq1050:box-border">
            <div className={number == "1" ? showenInput : hiddenInput}>
              <FormInput
                placeHolder="First Name"
                type="text"
                value={first_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setfirst_name(e.target.value)
                }
              />

              <FormInput
                placeHolder="Last Name"
                type="text"
                value={last_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setlast_name(e.target.value)
                }
              />

              <FormInput
                placeHolder="NickName"
                type="text"
                value={nickname}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNickName(e.target.value)
                }
              />

              <FormInput
                placeHolder="Email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className={number == "2" ? showenInput : hiddenInput}>
              <FormInput
                placeHolder="Domaine"
                type="text"
                value={domain}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDomain(e.target.value)
                }
              />
              <FormInput
                placeHolder="Skills"
                type="text"
                value={skills}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSkills(e.target.value)
                }
              />
              <div
                className="self-stretch rounded-sm bg-silver-200 box-border flex flex-col items-center justify-start py-[30px] px-5 gap-[12px] max-w-full border-[2px] border-solid border-blue-1"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <label htmlFor="fileInput">
                  <img
                    className="h-[104px] w-[152px] pr-[240px] pl-[240px] relative object-cover cursor-pointer "
                    loading="lazy"
                    alt="Upload file"
                    src="/icon0101-1@2x.png"
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <h2 className="m-0 w-[601px] relative text-inherit font-medium font-inherit inline-block max-w-full mq1050:text-7xl mq450:text-lgi flex justify-center items-center">
                  <p className="m-0">Drag and drop file here or choose file</p>
                </h2>
              </div>
            </div>

            <div className={number == "3" ? showenInput : hiddenInput}>
              <FormInput
                placeHolder="Password"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />

              <FormInput
                placeHolder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[54px] box-border gap-[59px] max-w-full text-18xl text-grey mq450:pb-[35px] mq450:box-border mq725:gap-[29px_59px]">
            <div className="self-stretch flex flex-col items-center justify-center gap-[23px] max-w-full">
              <TimeLine number={number} />
            </div>
            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[23px] pl-5 box-border max-w-full">
              <div className="w-[462px] flex flex-row items-start justify-start gap-[70px] max-w-full mq450:flex-wrap mq450:gap-[70px_35px]">
                <Button
                  className="h-[79px] flex-[0.6837] min-w-[127px] mq450:flex-1"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#c4c4c4",
                    fontSize: "28",
                    background: "#fff",
                    borderRadius: "6px",
                    "&:hover": { background: "#fff" },
                    height: 79,
                  }}
                >
                  BACK
                </Button>
                <Button
                  className="h-[79px] flex-1 relative min-w-[127px] mq450:flex-1"
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#ff4f4c",
                    fontSize: "28",
                    background: "#fff",
                    borderRadius: "6px",
                    "&:hover": { background: "#fff" },
                    height: 79,
                  }}
                  onClick={validation}
                >
                  NEXT
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[1041px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-base text-gray-3">
            <div className="relative font-medium">
              Copyright © PITCHINI 2024
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JointFreelancerP;
