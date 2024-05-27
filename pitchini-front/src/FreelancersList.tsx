import { FunctionComponent, useEffect, useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import FreelancerToChose from "./components/FreelancerToChose";
import SideBar from "./components/SideBar";
import { get } from "./utilFunctions/getData";
import { useParams } from "react-router-dom";

interface FreelancerData {
  id: number;
  nickName: string;
  jobTitle: string;
  bio: string;
  description: string;
}

interface DomainSkill {
  userId: number;
  domaine: string;
  skill: string;
  rate: number;
}

const FreelancersList: FunctionComponent = () => {
  const { id } = useParams();

  const [skills, setSkills] = useState<string[]>([]);
  const [domain, setDomain] = useState<string[]>([]);

  const [rate, setRate] = useState<number>(0);
  const [filteredUsersDomainSkills, setFilteredUsersDomainSkills] = useState<
    DomainSkill[]
  >([]);
  const [filteredDomainAndSkills, setFilteredDomainAndSkills] = useState<any[]>(
    []
  );
  const [AllDomainsAndSkills, setAllDomainsAndSkills] = useState<any[]>([]);
  const [freelancers, setFreelancers] = useState<FreelancerData[]>([]);

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
  async function getRate(id: number) {
    const res = await get(`http://localhost:3001/api/rate/avg/${id}`);
    console.log(res, "apapapap");
    return res !== null ? res : 0;
  }

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

        const FilteredUsersDomainSkills = await Promise.all(
          values.map(async (item) => {
            const rate = await getRate(item.userId);
            return {
              userId: item.userId,
              domaine: item.domaine,
              skill: item.skill,
              rate: rate,
            };
          })
        );
        const filteredUsers = FilteredUsersDomainSkills.filter(
          (user) => user.rate >= rate
        );
        setFilteredUsersDomainSkills(filteredUsers);
      }
    }
    fetchData2();
  }, [domain, skills, rate]);
  console.log(filteredUsersDomainSkills, "00000000000000000");
  useEffect(() => {
    async function getUsers() {
      const userIds = new Set(); // Set to store unique user IDs
      const updatedFreelancers = [];

      for (let i = 0; i < filteredUsersDomainSkills.length; i++) {
        const userId = filteredUsersDomainSkills[i].userId;

        // Check if the user ID is already processed
        if (!userIds.has(userId)) {
          const res = await get(`http://localhost:3001/api/user/${userId}`);
          const values = await res;

          // Add the user ID to the Set
          userIds.add(userId);

          // Create the user object and add it to the updatedFreelancers array
          let user = {
            id: values.id,
            nickName: values.nickname,
            jobTitle: values.jobTitle,
            bio: values.bio,
            description: values.description,
          };
          updatedFreelancers.push(user);
        }
      }
      setFreelancers(updatedFreelancers);
    }
    getUsers();
  }, [filteredUsersDomainSkills]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <main className="flex flex-row items-start justify-start py-0 pr-5 pl-0 box-border gap-[74.4px] max-w-full text-center text-6xl-4 text-gray-200 font-titre-grey mq450:gap-[19px] mq750:gap-[37px] mq750:pl-5 mq750:box-border">
        <SideBar></SideBar>
        <section className="flex-1 mt-[50px] flex flex-col items-start justify-start pt-[53px] px-0 pb-0 box-border max-w-[calc(100%_-_289px)] lg:pt-[34px] lg:box-border mq750:pt-[22px] mq750:box-border mq750:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[13px] box-border gap-[39px] max-w-full mq750:gap-[19px]">
            <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq1050:flex-wrap">
              <div className="w-[576px] flex flex-col items-start justify-start gap-[22px] min-w-[576px] max-w-full mq750:min-w-full mq1050:flex-1">
                <h1 className="m-0 self-stretch h-[89px] relative text-13xl tracking-[0.02em] leading-[131%] font-extrabold font-titre-grey text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-left inline-block shrink-0 mq450:text-lgi mq450:leading-[25px] mq1050:text-7xl mq1050:leading-[34px]">
                  <p className="m-0">{`Profesional Options `}</p>
                  <p className="m-0">Matching Your Skills</p>
                </h1>
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
                key={index}
                id={user.id}
                nickname={user.nickName}
                filteredUsersDomainSkills={filteredUsersDomainSkills}
                jobTitle={user.jobTitle}
                bio={user.bio}
                description={user.description}
                projectId={id}
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
