import { FunctionComponent, useEffect, useState } from "react";

import SideBar from "./components/SideBar";
import PortfolioHeader from "./components/PortfolioHeader";
import PortfolioStatistics from "./components/PortfolioStatistics";
import PortfolioAboutMe from "./components/PortfolioAboutMe";
import PortfolioServices from "./components/PortfolioService";
import PortfolioSkills from "./components/PortfolioSkills";
import PortfolioTestimonials from "./components/PortfolioTestimonials";
import { get } from "./utilFunctions/getData";
import { useParams } from "react-router-dom";
import PortfolioProjects from "./components/PortfolioProjects";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { modifyData } from "./utilFunctions/modifyData";
import { send } from "./utilFunctions/sendData";
//import PortfolioProjects from "./components/PortfolioProjects";
interface UserData {
  nickname: string;
  jobTitle: string;
  bio: string;
  description: string;
  skills: SkillData[];
}

interface DomainData {
  domain: string;
}

interface SkillData {
  skills: string;
  domain: string;
}

const Portfolio: FunctionComponent = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [domains, setDomains] = useState<DomainData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [projectsCount, setProjectsCount] = useState<number>(0);

  const [editOpen, setEditOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState<UserData>({
    nickname: "",
    jobTitle: "",
    bio: "",
    description: "",
    skills: [],
  });

  const { userId } = useParams();

  const [domainAndSkills, setDomainAndSkills] = useState<any[]>([]); // Define domainAndSkills state

  const [allSkills, setAllSkills] = useState<SkillData[]>([]); // Define domainAndSkills state
  const [addedSkills, setAddedSkills] = useState<SkillData[]>([]); // Define domainAndSkills state

  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/user/${userId}`);
      const values = await res;

      const userValues = {
        nickname: values.nickname,
        jobTitle: values.jobTitle,
        bio: values.bio,
        description: values.description,
      };

      setUser(userValues);
      setEditedUserData(userValues);
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData2() {
      const userId = 4;
      const res = await get(
        `http://localhost:3001/api/userSkills/alluserskillsdomains${userId}`
      );
      const values = await res;

      const uniqueDomains = Array.from(
        new Set(values.map((item) => item.domaine))
      ); // put them in set cause set doesn't allow duplicated values

      setDomains(uniqueDomains.map((domain) => ({ domain })));

      const userSkills = values.map((item) => ({
        skills: item.skillName,
        domain: item.domaine,
      }));

      setEditedUserData((prevUserData) => ({
        ...prevUserData,
        skills: userSkills, // Update skills property
      }));

      setSkills(userSkills);
    }

    fetchData2();
  }, []);

  /////////////////

  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/skills/all");
      const values = await res;

      const domainAndSkillsData = values.map((item) => ({
        domain: item.domaine,
        skills: item.skillName,
      }));

      setDomainAndSkills(domainAndSkillsData);
    }
    const filteredSkills = domainAndSkills.filter((item) =>
      domains.some((domain) => domain.domain === item.domain)
    );
    console.log(domains, "aa");
    setAllSkills(filteredSkills);

    fetchData();
  }, [editedUserData]);
  ///////////////////
  console.log(
    allSkills,
    "aaaaaaaaa",
    domainAndSkills,
    "1111111",
    domains,
    "0000000",
    skills,
    "111",
    editedUserData.skills
  );
  useEffect(() => {
    async function fetchData3() {
      const res = await get(
        `http://localhost:3001/api/project/userProjectsCounts/${userId}`
      );
      setProjectsCount(res.projectCount);
    }

    fetchData3();
  }, []);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleFieldChange = (field: keyof UserData, value: string) => {
    setEditedUserData((prev) => ({ ...prev, [field]: value }));
  };
  async function deleteData() {
    const userId = 4;
    await fetch(
      `http://localhost:3001/api/userskills/alluserskillsdomains/${userId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Output the response data ("Operation successful" message)
        // Handle success - for example, update UI or display a success message
      })
      .catch((error) => {
        console.error("Error deleting user skills:", error);
        // Handle error - display an error message to the user or handle accordingly
      });
  }
  function voided() {}
  const handleSaveChanges = async () => {
    const userId = 4;
    setUser(editedUserData);
    await modifyData(
      editedUserData,
      `http://localhost:3001/api/user/${userId}`
    );
    // deleteData();
    for (let i = 0; i < addedSkills.length; i++) {
      let data = {
        domaine: addedSkills[i].domain,
        skillName: addedSkills[i].skills,
        userId,
      };
      send(false, data, voided, "http://localhost:3001/api/userskills/");
    }
    handleEditClose();
  };
  const handleSkillToggle = (skill: string, domain: string) => {
    const isSkillChecked = editedUserData.skills.some(
      (s) => s.skills === skill
    );
    if (!isSkillChecked) {
      // Skill is not yet checked, add it to the skills list
      const updatedSkills1 = [
        ...editedUserData.skills,
        { skills: skill, domain: domain },
      ];
      setEditedUserData((prev) => ({ ...prev, skills: updatedSkills1 }));
      const updatedSkills = [...addedSkills, { skills: skill, domain: domain }];
      setAddedSkills(updatedSkills);
    }
  };

  console.log(addedSkills, "00000000000000000000000");
  return (
    <div className="mt-[50px] w-full bg-white overflow-hidden flex items-center justify-center pt-0 px-0 pb-[0.2px] box-border leading-[normal] tracking-[normal]">
      <SideBar></SideBar>
      <div className=" w-full flex flex-col items-center justify-center">
        <PortfolioHeader
          nickname={user?.nickname}
          jobTitle={user?.jobTitle}
        ></PortfolioHeader>

        <PortfolioStatistics
          projectCount={projectsCount}
          userId={userId}
        ></PortfolioStatistics>
        <Button variant="outlined" color="primary" onClick={handleEditOpen}>
          Edit Profile
        </Button>
        <PortfolioAboutMe
          bio={user?.bio}
          description={user?.description}
        ></PortfolioAboutMe>
        <PortfolioServices domains={domains}></PortfolioServices>
        <PortfolioSkills skills={skills}></PortfolioSkills>
        <PortfolioProjects userId={userId}></PortfolioProjects>
        <PortfolioTestimonials userId={userId}></PortfolioTestimonials>

        {/* Edit Profile Modal */}
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              label="Nickname"
              value={editedUserData.nickname}
              onChange={(e) => handleFieldChange("nickname", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Job Title"
              value={editedUserData.jobTitle}
              onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Bio"
              value={editedUserData.bio}
              onChange={(e) => handleFieldChange("bio", e.target.value)}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
            <TextField
              label="Description"
              value={editedUserData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
            {/* Additional Edit Fields (e.g., Skills) */}
          </DialogContent>
          <DialogContent>
            {allSkills.map((skill) => (
              <FormControlLabel
                key={skill.skills}
                control={
                  <Checkbox
                    checked={editedUserData.skills?.some(
                      (s) => s.skills === skill.skills
                    )}
                    onChange={() =>
                      handleSkillToggle(skill.skills, skill.domain)
                    }
                  />
                }
                label={skill.skills}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* footer to put here  */}
    </div>
  );
};

export default Portfolio;
