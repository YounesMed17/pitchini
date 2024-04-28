import { FunctionComponent, useEffect, useState } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import FreelancerToChose from "./components/FreelancerToChose";
import SideBar from "./components/SideBar";
import { get } from "./utilFunctions/getData";

const FreelancersList: FunctionComponent = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [domain, setDomain] = useState<string[]>([]);
  const [rate, setRate] = useState(0);
  const [filteredUsersDomainSkills, setFilteredUsersDomainSkills] = useState<
    string[]
  >([]);

  const [filteredDomainAndSkills, setFilteredDomainAndSkills] = useState<any[]>(
    []
  );
  const [AllDomainsAndSkills, setAllDomainsAndSkills] = useState<any[]>([]);
  const [freelancers, setFreelancers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/skills/all");
      const values = await res;

      const AllDomainsAndSkillsData = values.map((item) => ({
        domaine: item.domaine,
        skills: item.skillName,
      }));

      setAllDomainsAndSkills(AllDomainsAndSkillsData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filteredSkills: any[] = [];
    // Filter AllDomainsAndSkills based on selected domains
    AllDomainsAndSkills.forEach((item) => {
      if (domain.includes(item.domaine)) {
        filteredSkills.push(item);
      }
    });
    // Update selected skills state
    setFilteredDomainAndSkills(filteredSkills);
  }, [domain, AllDomainsAndSkills]);

  // Modify the change handler for skills
  const handleSkillChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    if (typeof selectedValue === "string") {
      setSkills([selectedValue]); // Update skills state with single selected value
    } else if (Array.isArray(selectedValue)) {
      setSkills(selectedValue as string[]); // Update skills state with selected array
    }
  };
  const handleDomainChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;

    if (typeof selectedValue === "string") {
      setDomain([selectedValue]); // Update skills state with single selected value
    } else if (Array.isArray(selectedValue)) {
      setDomain(selectedValue as string[]); // Update skills state with selected array
    }
  };

  const handleRateChange = (rateV: number) => {
    if (rateV == rate) {
      setRate(0);
    } else {
      setRate(rateV);
    }
  };

  useEffect(() => {
    async function fetchData2() {
      const skillsLabel = "skills";
      const domainsLabel = "domains";

      const path =
        skills.length == 0 && domain.length > 0
          ? `http://localhost:3001/api/userSkills/filtered/${encodeURIComponent(
              JSON.stringify(domain)
            )}/${domainsLabel}`
          : skills.length > 0
          ? `http://localhost:3001/api/userSkills/filtered/${encodeURIComponent(
              JSON.stringify(skills)
            )}/${skillsLabel}`
          : "";
      if (path != "") {
        const res = await get(path);
        const values = await res.users;

        const FilteredUsersDomainSkills = values.map((item) => ({
          userId: item.userId,
          domaine: item.domaine,
          skill: item.skill,
        }));
        setFilteredUsersDomainSkills(FilteredUsersDomainSkills);
      }
    }
    fetchData2();
  }, [domain, skills]);

  useEffect(() => {
    async function getUsers() {
      const updatedFreelancers = [];

      for (let i = 0; i < filteredUsersDomainSkills.length; i++) {
        const res = await get(
          `http://localhost:3001/api/user/${filteredUsersDomainSkills[i].userId}`
        );
        const values = await res;
        let user = {
          id: values.id,
          nickName: values.nickname,
        };
        updatedFreelancers.push(user);
      }
      setFreelancers(updatedFreelancers);
    }
    getUsers();
  }, [filteredUsersDomainSkills]);
  console.log("areeee", freelancers);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <div className="w-[33px] h-[9px] relative hidden opacity-[0.29] z-[2]" />
      <div className="w-[33px] h-[33px] relative hidden opacity-[0.29] z-[3]" />
      <main className="w-[1356px] flex flex-row items-start justify-start py-0 pr-5 pl-0 box-border gap-[74.4px] max-w-full text-center text-6xl-4 text-gray-200 font-titre-grey mq450:gap-[19px] mq750:gap-[37px] mq750:pl-5 mq750:box-border">
        <SideBar></SideBar>
        <section className="flex-1 mt-[50px] flex flex-col items-start justify-start pt-[53px] px-0 pb-0 box-border max-w-[calc(100%_-_289px)] lg:pt-[34px] lg:box-border mq750:pt-[22px] mq750:box-border mq750:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[13px] box-border gap-[39px] max-w-full mq750:gap-[19px]">
            <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq1050:flex-wrap">
              <div className="w-[576px] flex flex-col items-start justify-start gap-[22px] min-w-[576px] max-w-full mq750:min-w-full mq1050:flex-1">
                <h1 className="m-0 self-stretch h-[89px] relative text-13xl tracking-[0.02em] leading-[131%] font-extrabold font-titre-grey text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-left inline-block shrink-0 mq450:text-lgi mq450:leading-[25px] mq1050:text-7xl mq1050:leading-[34px]">
                  <p className="m-0">{`Profesional Options `}</p>
                  <p className="m-0">Matching Your Skills</p>
                </h1>
                <div className="w-[365px] flex flex-row items-start justify-start py-0 px-1 box-border max-w-full">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[5px] max-w-full">
                    <div className="w-[204px] flex flex-row items-start justify-between gap-[20px]">
                      <h3 className="m-0 w-[23px] relative text-mid leading-[19px] font-medium font-titre-grey text-gray-200 text-center flex items-center justify-center shrink-0 min-w-[23px]">
                        All
                      </h3>
                      <h3 className="m-0 relative text-mid leading-[19px] font-normal font-titre-grey text-darkgray-700 text-left inline-block min-w-[112px]">
                        Contacts list
                      </h3>
                    </div>
                    <div className="self-stretch h-px flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full">
                      <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-grey" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[262px] flex flex-col items-end justify-start min-w-[262px] mq1050:flex-1">
                <div className="self-stretch rounded-[5.98px] bg-gainsboro-200 overflow-hidden flex flex-row items-end justify-start pt-0 px-1.5 pb-[0.4px] shrink-0 [debug_commit:1de1738] border-[0.7px] border-solid border-grey">
                  <div className="w-[143.3px] flex flex-col items-start justify-end pt-0 px-0 pb-[7.6px] box-border">
                    <div className="self-stretch flex flex-row items-end justify-start gap-[2px]">
                      <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[2.6px]">
                        <img
                          className="w-[25.4px] h-[20.2px] relative object-cover"
                          alt=""
                          src="/vecteezy-notificationiconsvectordesign-10654946-converti05-1@2x.png"
                        />
                      </div>
                      <input
                        className="w-[calc(100%_-_25.4px)] [border:none] [outline:none] font-light font-montserrat text-xs bg-[transparent] h-[25.4px] flex-1 relative leading-[120%] text-dimgray-400 text-left flex items-center min-w-[70px] p-0"
                        placeholder="SEARCH ..."
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start gap-[13.3px] ml-[-6.6px]">
                    <div className="h-0 w-0 relative bg-[url('/public/headshotphotographybelfast2-3@2x.png')] bg-cover bg-no-repeat bg-[top]">
                      <img
                        className="absolute top-[0px] left-[0px] w-0 h-0 object-cover hidden"
                        alt=""
                        src="/headshotphotographybelfast2-3@2x.png"
                      />
                      <img
                        className="absolute top-[0px] left-[0px] w-0 h-0 object-cover"
                        alt=""
                        src="/headshotphotographybelfast2-3@2x.png"
                      />
                    </div>
                    <div className="h-[41px] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
                      <div className="w-0.5 h-[42px] relative box-border z-[1] border-r-[1px] border-solid border-grey" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] flex flex-row flex-wrap items-start justify-start gap-[8px] max-w-full">
              <Select
                className="w-[20%]"
                labelId="select-label"
                id="select"
                value={domain} // Set the selected value
                onChange={handleDomainChange} // Handle change event
                displayEmpty // to see the label select domain
                multiple
                renderValue={(selected) => (
                  <div>
                    {selected.length === 0 ? "Categories" : selected.join(", ")}
                  </div>
                )}
              >
                {AllDomainsAndSkills.map((val, index) => (
                  <MenuItem key={index} value={val.domaine}>
                    {val.domaine}
                  </MenuItem>
                ))}
              </Select>
              <Select
                className="w-[20%]"
                labelId="select-label"
                id="select"
                value={skills} // Set the selected value
                onChange={handleSkillChange} // Handle change event
                displayEmpty // to see the label select domain
                multiple
                renderValue={(selected) => (
                  <div>
                    {selected.length === 0 ? "Skills" : selected.join(", ")}
                  </div>
                )}
              >
                {domain.length === 0
                  ? AllDomainsAndSkills.map((val, index) => (
                      <MenuItem key={index} value={val.skills}>
                        {val.skills}
                      </MenuItem>
                    ))
                  : filteredDomainAndSkills.map((val, index) => (
                      <MenuItem key={index} value={val.skills}>
                        {val.skills}
                      </MenuItem>
                    ))}
              </Select>
              <Select
                className="w-[20%]"
                labelId="select-label"
                id="select3"
                value={rate || "Rates"}
                renderValue={() => {
                  return rate ? `${"⭐".repeat(rate)}` : "Rates";
                }}
              >
                {[1, 2, 3, 4, 5].map((rate) => (
                  <MenuItem
                    key={rate}
                    value={rate}
                    onClick={() => handleRateChange(rate)}
                  >
                    {`⭐`.repeat(rate)}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          {freelancers.map((user, index) => (
            <div>
              <FreelancerToChose
                id={user.id}
                nickname={user.nickName}
                filteredUsersDomainSkills={filteredUsersDomainSkills}
              />
              <div className="self-stretch h-0.5 relative box-border opacity-[0.21] border-t-[1px] border-solid border-grey1" />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default FreelancersList;
