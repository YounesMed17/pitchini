import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//import { get } from "./utilFunctions/getData";
import {
  validateEmail,
  validateNotEmpty,
  validatePassword,
} from "./utilFunctions/ValidateFunction";
import { send } from "./utilFunctions/sendData";
import Navbar from "./components/Navbar";
import SecondHeader from "./components/SecondHeader";
import FormInput from "./components/FormInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import ProjectTimeline from "./components/ProjectTimeLine";
import ChooseAvatar from "./components/ChooseAvatar";

interface SelectedFile {
  file: File;
  type: string;
}

interface filtered {
  domaine: string;
  skillName: string;
}

interface newState {
  domaine: string;
  skill: string;
}

const JointFreelancerP: FunctionComponent = () => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setstep] = useState("01");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [domainAndSkills, setDomainAndSkills] = useState<any[]>([]); // Define domainAndSkills state
  const [skills, setSkills] = useState<string[]>([]); // Initialize skills state as an array
  const [domain, setDomain] = useState<string[]>([] as string[]); // Initialize skills state as an array

  const [onlyDomains, setOnlyDomains] = useState<string[]>([]); // Initialize skills state as an array

  const [filteredDomainAndSkills, setFilteredDomainAndSkills] = useState<
    filtered[]
  >([]); // Define domainAndSkills state
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const filteredSkills: any[] = [];
    // Filter domainAndSkills based on selected domains
    domainAndSkills.forEach((item) => {
      if (domain.includes(item.domaine)) {
        filteredSkills.push(item);
      }
    });
    // Update selected skills state
    setFilteredDomainAndSkills(filteredSkills);
  }, [domain, domainAndSkills]);
  console.log(filteredDomainAndSkills, "aaaa");
  // Modify the change handler for skills
  const handleSkillChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;
    if (typeof selectedValue === "string") {
      setSkills([selectedValue]); // Update skills state with single selected value
    } else if (Array.isArray(selectedValue)) {
      setSkills(selectedValue); // Update skills state with selected array
    }
  };
  const handleDomainChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;

    if (typeof selectedValue === "string") {
      if (
        domain.length < 2 ||
        domain.includes(selectedValue[selectedValue.length - 1])
      ) {
        setDomain([selectedValue]); // Update the domain state with the selected unique value
      }
    } else if (Array.isArray(selectedValue)) {
      setDomain(selectedValue); // Update the domain state with the selected array
    }
  };

  const navigate = useNavigate();
  const navigating = useCallback(() => {
    navigate("/signupinterview", {
      state: { first_name, last_name },
    });
  }, [navigate, first_name, last_name]);

  let first = true;
  let last = true;
  let Email = true;
  let Domain = true;
  let Skills = true;
  let Password = true;
  let ConfirPassword = true;
  let NickName = true;
  let Bio = true;
  let JobTitle = true;
  let Description = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/skills/all");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json(); // Parse response as JSON
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: not an array");
        }
        // Data is in the expected format, proceed with setting state
        const domainAndSkillsData = data.map((item) => ({
          domaine: item.domaine,
          skillName: item.skillName,
        }));
        const uniqueDomains = [
          ...new Set(domainAndSkillsData.map((item) => item.domaine)),
        ];
        setDomainAndSkills(domainAndSkillsData);
        setOnlyDomains(uniqueDomains);
      } catch (error) {
        // Handle fetch errors
        console.error("Error fetching data:", error);
        // Optionally, you can set an error state or display an error message to the user
      }
    };
    fetchData();
  }, []);

  if (!isNextClicked) {
    Bio = false;
    JobTitle = false;
    Description = false;
    last = false;
    Email = false;
    Skills = false;
    ConfirPassword = false;
    NickName = false;
  }
  if (isNextClicked) {
    if (step == "01") {
      if (!validateNotEmpty(first_name)) {
        first = true;
      } else first = false;

      if (!validateNotEmpty(last_name)) {
        last = true;
      } else last = false;
      if (!validateNotEmpty(bio)) {
        Bio = true;
      } else Bio = false;
      if (!validateNotEmpty(jobTitle)) {
        JobTitle = true;
      } else JobTitle = false;
      if (!validateNotEmpty(description)) {
        Description = true;
      } else Description = false;

      if (
        !validateNotEmpty(nickname) ||
        nickname.includes(last_name) ||
        nickname.includes(first_name)
      ) {
        NickName = true;
      } else NickName = false;

      if (!validateEmail(email)) {
        Email = true;
      } else Email = false;
    } else if (step == "02") {
      domain.length == 0 ? (Domain = true) : (Domain = false);
      skills.length == 0 ? (Skills = true) : (Skills = false);
    } else if (step == "03") {
      !validatePassword(password) ? (Password = true) : (Password = false);
      password != confirmPassword
        ? (ConfirPassword = true)
        : (ConfirPassword = false);
    }
  }

  const createStateWithDomainAndSkills = (
    filteredDomainAndSkills: filtered[],
    skills: string[]
  ) => {
    // Initialize the new state
    const newState: newState[] = [];

    // Iterate through each skill
    skills.forEach((skill) => {
      // Find the corresponding domain for the skill
      const domainSkill = filteredDomainAndSkills.find(
        (item) => item.skillName === skill
      );

      // If a domain is found, add the domain and skill to the new state
      if (domainSkill) {
        newState.push({
          domaine: domainSkill.domaine,
          skill: domainSkill.skillName,
        });
      }
    });

    // Return the new state
    return newState;
  };

  // Example usage
  const newDomainAndSkillsState = createStateWithDomainAndSkills(
    filteredDomainAndSkills,
    skills
  );
  function validation() {
    setIsNextClicked(true);
    validation2();
  }
  async function validation2() {
    if (step == "01") {
      if (
        !last &&
        !first &&
        !Email &&
        !NickName &&
        !JobTitle &&
        !Description &&
        !Bio
      ) {
        setstep("02");
        setIsNextClicked(false);
      }
    }
    if (step == "02") {
      if (!Domain && !Skills && selectedFiles.length > 0) {
        setstep("03");
        setIsNextClicked(false);
      }
    }

    if (step == "03" && !Password && !ConfirPassword) {
      const formData = {
        first_name,
        last_name,
        email,
        nickname,
        role: "freelancer",
        password,
        bio,
        description,
        jobTitle,
        avatar,
      };
      // Send POST request to backend
      const res = await send(
        true,
        formData,
        navigating,
        "http://localhost:3001/api/user/inscriptionUser"
      );
      const userId = await res;
      for (let i = 0; i < newDomainAndSkillsState.length; i++) {
        await send(
          false,
          {
            domaine: newDomainAndSkillsState[i].domaine,
            skillName: newDomainAndSkillsState[i].skill,
            userId,
          },
          navigating,
          "http://localhost:3001/api/userskills/"
        );
      }
      handleSubmitFile(userId);
    }
  }
  const [type, setType] = useState("");

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const updatedFileObjects: SelectedFile[] = Array.from(files).map(
        (file) => ({
          file,
          type: type, // Access the file type using file.type
        })
      );
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...updatedFileObjects,
      ]);
      // Upload the files or perform any other actions
    }
  };
  //////////////////////////////////////////////////////

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*const file = event.target.files && event.target.files[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
    }*/
    const files = event.target.files;
    if (files) {
      const updatedFiles: File[] = Array.from(files); // Convert FileList to Array<File>
      const updatedFileObjects: SelectedFile[] = updatedFiles.map((file) => ({
        file,
        type: type,
      }));
      setSelectedFiles([...selectedFiles, ...updatedFileObjects]);
    }
  };
  console.log(selectedFiles);
  const handleSubmitFile = async (userId: number) => {
    for (let i = 0; i < selectedFiles.length; i++) {
      let formData = new FormData();
      formData.append("File", selectedFiles[i].file);
      formData.append("userId", userId.toString());
      formData.append("type", selectedFiles[i].type);

      try {
        const response = await fetch("http://localhost:3001/api/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("File uploaded successfully");
          // Optionally, you can handle successful upload here
        } else {
          console.error("Failed to upload file");
          // Optionally, you can handle upload failure here
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        // Optionally, you can handle errors here
      }
    }
  };

  ///////////////////////////////////////////////////////
  function backStep() {
    if (step == "02") setstep("01");
    else if (step == "03") setstep("02");
  }

  const handleAvatarChange = (selectedAvatar: any) => {
    // Handle selectedAvatar data here (e.g., send to server, update state)

    setAvatar(selectedAvatar.url);
  };
  const showenInput =
    "flex-1 flex flex-col items-start justify-start gap-[21px] max-w-full ";
  const hiddenInput =
    "flex-1 flex flex-col items-start justify-start gap-[21px] max-w-full hidden ";
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[57px] box-border gap-[81.40000000000146px] tracking-[normal] mq1000:gap-[41px_81.4px] mq450:gap-[20px_81.4px]">
      <Navbar />
      <main className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5 box-border max-w-full">
        <section className="flex flex-col items-start justify-start gap-[77px] max-w-full text-left text-44xl text-grey2 font-titre-grey mq1050:gap-[38px_77px] mq725:gap-[19px_77px]">
          <SecondHeader
            path="/login02-converti02-1@2x.png"
            title1="Create your pitchini account "
            title2="Are you using pitchini as a recruter or a freelancer"
            showButtons={true}
            relatedTo="freelancer"
          />
          <div className="self-stretch flex flex-row items-center md:items-start justify-start pt-0 pb-1.5 pr-[41px] pl-[46px] box-border max-w-full text-13xl text-blue-1 mq1050:pl-[23px] mq1050:box-border">
            <div className={step == "01" ? showenInput : hiddenInput}>
              <ChooseAvatar onChange={handleAvatarChange}></ChooseAvatar>

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
                errorStatus={NickName}
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
                placeHolder="JobTitle"
                type="text"
                value={jobTitle}
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setJobTitle(e.target.value)}
                message={jobTitle == "" ? "jobTitle is required" : ""}
                errorStatus={JobTitle}
                textArea={false}
              />

              <FormInput
                placeHolder="Bio"
                type="text"
                value={bio}
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setBio(e.target.value)}
                message={bio == "" ? "bio is required" : ""}
                errorStatus={Bio}
                textArea={false}
              />

              <FormInput
                placeHolder="Description"
                type="text"
                value={description}
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setDescription(e.target.value)}
                message={description == "" ? "description is required" : ""}
                errorStatus={Description}
                textArea={false}
              />
            </div>

            <div className={step == "02" ? showenInput : hiddenInput}>
              <Select
                className="w-[50%]"
                labelId="select-label"
                id="select"
                value={domain} // Ensure that domain is of the correct type or explicitly specify the type
                onChange={handleDomainChange}
                displayEmpty
                multiple
                renderValue={(
                  selected: string[] // Explicitly specify the type of selected
                ) => (
                  <div>
                    {selected.length === 0
                      ? "Select max 2 domains"
                      : selected.join(", ")}
                  </div>
                )}
              >
                {onlyDomains.map((val, index) => (
                  <MenuItem key={index} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>

              <div className={!Domain || !isNextClicked ? "hidden" : ""}>
                <p className="mt-[-18px] text-red-500 text-[21px]">
                  you need to select 1 domain at least
                </p>
              </div>
              <Select
                className="w-[50%]"
                labelId="select-label"
                id="select"
                value={skills} // Set the selected value as an array
                onChange={handleSkillChange} // Handle change event
                displayEmpty // to see the label select domain
                multiple // Allow multiple choices
                renderValue={(selected) => (
                  <div>
                    {selected.length < 1
                      ? "select skills"
                      : selected.join(", ")}
                  </div>
                )}
              >
                {filteredDomainAndSkills.map((val, index) => (
                  <MenuItem key={index} value={val.skillName}>
                    {val.skillName}
                  </MenuItem>
                ))}
              </Select>
              <div className={!Skills || !isNextClicked ? "hidden" : ""}>
                <p className="mt-[-18px] text-red-500 text-[21px]">
                  you need to select 1 skill at least
                </p>
              </div>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  File type : (You can add multiple files , before you add one
                  select his type)
                </FormLabel>
                <RadioGroup
                  aria-label="options"
                  name="options"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel value="CV" control={<Radio />} label="cv" />
                  <FormControlLabel
                    value="Portfolio"
                    control={<Radio />}
                    label="portfolio"
                  />
                  <FormControlLabel
                    value="Certificat"
                    control={<Radio />}
                    label="certificat"
                  />
                </RadioGroup>
              </FormControl>
              <div
                className="self-stretch md:w-[550px] h-[150px] w-[220px] rounded-sm bg-silver-200 box-border flex flex-col items-center justify-start py-[30px] px-5 gap-[12px] border-[2px] border-solid border-blue-1"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <label htmlFor="fileInput">
                  <img
                    className="h-[50px] w-[62px] pr-[100px] pl-[100px] md:h-[54px] md:w-[100px] md:pr-[240px] md:pl-[240px] relative object-cover cursor-pointer "
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
                <div className="m-0 md:w-[501px] w-[250px] relative text-inherit font-medium font-inherit inline-block max-w-full text-sm md:text-lg flex justify-center items-center">
                  <div className="flex flex-col">
                    {selectedFiles.length != 0 ? (
                      selectedFiles.map((item) => (
                        <p className="m-0"> {item.file.name}</p>
                      ))
                    ) : (
                      <p className="m-0">
                        Drag and drop file here or choose file
                      </p>
                    )}{" "}
                  </div>
                </div>
                <div
                  className={
                    selectedFiles.length > 0 || !isNextClicked
                      ? "hidden"
                      : " mt-[22px]"
                  }
                >
                  <p className="mt-[-18px] text-red-500 text-[21px]">
                    put your cv/portfoli please
                  </p>
                </div>
              </div>
            </div>

            <div className={step == "03" ? showenInput : hiddenInput}>
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
                errorStatus={isNextClicked ? Password : false}
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
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[54px] box-border gap-[59px] max-w-full text-18xl text-grey mq450:pb-[35px] mq450:box-border mq725:gap-[29px_59px]">
            <div className="self-stretch flex flex-col items-center justify-center gap-[23px] max-w-full">
              <ProjectTimeline
                relatedTo="singupfreelancer"
                step={
                  step == "01"
                    ? 0
                    : step == "02"
                    ? 1
                    : step == "03"
                    ? 2
                    : step == "04"
                    ? 4
                    : 0
                }
              />{" "}
            </div>
            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[23px] pl-5 box-border max-w-full">
              <div className="w-[462px] flex flex-row items-center justify-center gap-[70px] max-w-full mq450:flex-wrap mq450:gap-[70px_35px]">
                <div className={step == "04" || step == "01" ? "hidden" : ""}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowBackIcon />}
                    onClick={backStep}
                  >
                    Back
                  </Button>
                </div>
                <div className={step == "04" ? "hidden" : ""}>
                  <Button
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    onClick={validation}
                  >
                    Next
                  </Button>
                </div>
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
