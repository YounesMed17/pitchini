import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, MenuItem, Select } from "@mui/material";
import EnTete from "./components/EnTete";
import SignUpSecondHeader from "./components/SecondHeader";
import ProjectTimeline from "./components/ProjectTimeLine";
import { get } from "./utilFunctions/getData";
import { validateNotEmpty } from "./utilFunctions/ValidateFunction";
import StepOneFormPostProject from "./components/StepOneFormPostProject";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { send } from "./utilFunctions/sendData";

const PostProject: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [step, setstep] = useState("01");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [domain, setDomain] = useState<string[]>([]); // Initialize skills state as an array
  const [domainAndSkills, setDomainAndSkills] = useState<any[]>([]); // Define domainAndSkills state
  const [domainServicesPrices, setDomainServicesPrices] = useState<any[]>([]); // Define domainAndSkills state
  const [services, setServices] = useState<string[]>([]);
  const [sum, setsum] = useState();
  const [devis, setDevis] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>(""); // State to hold selected value

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
    onChange((event.target as HTMLInputElement).value);
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue = event.target.value; // Get the value from the input field
    // const dateObject = new Date(selectedDateValue); // Convert the value to a Date object

    // Format the date to 'yyyy-MM-dd'
    //  const formattedDate = dateObject.toISOString().split("T")[0]; // Get 'yyyy-MM-dd' part

    setSelectedDate(selectedDateValue); // Set the formatted date string in the state
  };

  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/services/all");
      const values = await res;

      const domainAndSkillsData = values.map((item) => ({
        id: item.id,
        domaine: item.domaine,
        service: item.service,
        price: item.price,
      }));

      setDomainServicesPrices(domainAndSkillsData);
    }

    fetchData();
  }, []);

  const handleDomainChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;

    if (typeof selectedValue === "string") {
      setDomain([selectedValue]); // Update skills state with single selected value
    } else if (Array.isArray(selectedValue)) {
      setDomain(selectedValue as string[]); // Update skills state with selected array
    }
  };

  const handleServicesChange = (
    event: SelectChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value;

    if (typeof selectedValue === "string") {
      setServices([selectedValue]); // Update skills state with single selected value
    } else if (Array.isArray(selectedValue)) {
      setServices(selectedValue as string[]); // Update skills state with selected array
    }
  };
  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/skills/all");
      const values = await res;

      const domainAndSkillsData = values.map((item) => ({
        domaine: item.domaine,
        skills: item.skillName,
      }));

      setDomainAndSkills(domainAndSkillsData);
    }

    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      // Upload the files or perform any other actions
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      setSelectedFiles([...selectedFiles, ...Array.from(droppedFiles)]);
      // Upload the dropped files or perform any other actions
    }
  };
  const navigate = useNavigate();
  console.log(services);
  const navigating = useCallback(() => {
    navigate("/signupinterview", {
      state: { title, description },
    });
  }, [navigate, title, description]);

  async function validation2() {
    if (step === "01") {
      if (
        validateNotEmpty(title) &&
        validateNotEmpty(description) &&
        domain.length > 0
      ) {
        setstep("02");
        setIsNextClicked(false);
      }
    }

    if (step === "02") {
      if ((services.length > 0 || devis) && selectedDate !== "") {
        setstep("03");
        const projectFormData = {
          name: title,
          description,
          deadLine: selectedDate,
          totalPrice: sum,
          workingPreference: selectedValue,
          addedFile: selectedFiles.length > 0,
          requestQuotation: devis,
        };

        try {
          // Send project data and await the response
          const projectId = await send(
            false,
            projectFormData,
            navigating,
            "http://localhost:3001/api/project/addP"
          );

          if (projectId) {
            //sending files if there is
            const fileFormData = {
              link: "",
              type: "cv/portfolio",
              userId: projectId,
              file: selectedFiles[selectedFiles.length - 1],
            };
            console.log(fileFormData);
            await send(
              false,
              fileFormData,
              navigating,
              "http://localhost:3001/api/file"
            );

            // Iterate over domainServicesPrices array asynchronously
            for (const value of domainServicesPrices) {
              if (services.includes(value.service)) {
                console.log("Service ID: " + value.id + "pr " + projectId);

                // Send service data for each matching service

                await send(
                  false,
                  { serviceId: value.id, projectId },
                  navigating,
                  "http://localhost:3001/api/projectServicesList/addS"
                );
              }
            }
          } else {
            console.error("Project ID is undefined or missing in response");
          }
        } catch (error) {
          console.error("Error while sending project data:", error);
        }
      }
    }
  }

  useEffect(() => {
    let total = 0;

    domainServicesPrices.forEach((value) => {
      if (services.includes(value.service)) {
        const number = parseInt(value.price.match(/\d+/)[0]); // Extracts the number part, converts it to an integer
        total += number; // Add the number to the sum
      }
    });

    setsum(total); // Update the sum state after the loop
  }, [domainServicesPrices, services]);

  console.log(services);
  function validation() {
    setIsNextClicked(true);
    validation2();
  }
  function updateDevis() {
    setDevis(true);
  }
  return (
    <div className="w-full relative flex flex-row items-start justify-start tracking-[normal]">
      <main className="h-[2129px] flex-1 bg-white flex flex-col items-start justify-start pt-0 px-0 pb-[69px] box-border gap-[72px] max-w-full text-left text-[16.4px] text-gray-3 font-join-text lg:pb-5 lg:box-border mq450:gap-[18px_72px] mq750:h-auto mq750:gap-[36px_72px]">
        <EnTete />
        <section className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[6062.700000000001px] box-border max-w-full shrink-0 text-left text-44xl text-grey font-join-text lg:pb-[1665px] lg:box-border mq450:pb-[703px] mq450:box-border mq1050:pb-[1082px] mq1050:box-border">
          <div className="w-[972px] flex flex-col items-start justify-start gap-[77px] max-w-full mq750:gap-[19px_77px] mq1050:gap-[38px_77px]">
            <SignUpSecondHeader
              path="/src/assets/postJob.png"
              title1="Post Your Project"
              title2="Finds the best experts to help you with your projects"
              showButtons={false}
            />

            <ProjectTimeline step={step} />
            <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[85px] box-border gap-[78px] max-w-full text-13xl text-blue mq450:pb-9 mq450:box-border mq750:gap-[19px_78px] mq1050:gap-[39px_78px] mq1050:pb-[55px] mq1050:box-border">
              {step === "01" && (
                <StepOneFormPostProject
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  domain={domain}
                  domainAndSkills={domainAndSkills}
                  handleFileChange={handleFileChange}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  handleDomainChange={handleDomainChange}
                  isNextClicked={isNextClicked}
                  selectedValue={selectedValue}
                  handleRadioChange={handleRadioChange}
                />
              )}
              <div
                className={
                  step == "02"
                    ? "self-stretch flex flex-col items-start justify-start gap-[11px] max-w-full"
                    : "hidden"
                }
              >
                <Select
                  className="w-[50%]"
                  labelId="select-label"
                  id="select"
                  value={services}
                  onChange={handleServicesChange}
                  displayEmpty
                  multiple
                  renderValue={(selected) => (
                    <div>
                      {selected.length === 0
                        ? "Select at least 1 service"
                        : selected.join(", ")}
                    </div>
                  )}
                >
                  {domainServicesPrices.map(
                    (val, index) =>
                      domain.includes(val.domaine) && (
                        <MenuItem key={index} value={val.service}>
                          {val.service + ": " + val.price}
                        </MenuItem>
                      )
                  )}
                </Select>

                <TableContainer
                  component={Paper}
                  className={services.length == 0 && "hidden"}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {domainServicesPrices
                        .filter((service) => services.includes(service.service))
                        .map((service, index) => (
                          <TableRow key={index}>
                            <TableCell>{service.service}</TableCell>
                            <TableCell>{service.price}</TableCell>
                          </TableRow>
                        ))}
                      <TableRow>
                        <TableCell>The total sum is {sum} DT</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="self-stretch h-[53px] relative text-6xl font-medium text-blue text-left inline-block shrink-0 mq1050:text-7xl mq450:text-lgi mt-[24px] mb-[-10px]">
                  <p className="m-0 " style={{ color: "#6495ED" }}>
                    If you have more personalized tasks request a quotation
                  </p>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#fafafa", // Creme background color
                      color: "#757575", // Blue text color
                      borderRadius: 8, // Rounded corners
                      padding: "12px 24px", // Padding
                      fontWeight: "bold", // Bold text
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
                      transition: "background-color 0.3s ease", // Smooth transition
                      "&:hover": {
                        backgroundColor: "#f0f0f0", // Light gray background on hover
                      },
                    }}
                    onClick={updateDevis}
                  >
                    Request a quotation
                  </Button>
                  <div className="mt-8 relative">
                    <input
                      type="date"
                      className="block w-[200px] p-3 rounded-lg border-3 border-gray-300 shadow-lg"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
              </div>
              <div className={step == "03" ? "text-center" : "hidden"}>
                <h3>
                  Project added successfully <br></br> our team will verify it
                  and publish it as soon as possible
                </h3>
              </div>
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                <div className="w-[462px] flex flex-row items-start justify-start gap-[70px] max-w-full mq450:flex-wrap mq450:gap-[70px_35px]">
                  <Button
                    className="h-[79px] flex-1 relative min-w-[127px] mq450:flex-1 "
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

export default PostProject;
