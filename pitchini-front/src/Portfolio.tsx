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
//import PortfolioProjects from "./components/PortfolioProjects";
interface UserData {
  nickname: string;
  jobTitle: string;
  bio: string;
  description: string;
}

interface DomainData {
  domain: string;
}

interface SkillData {
  skill: string;
}

const Portfolio: FunctionComponent = () => {
  const [user, setUser] = useState<UserData | null>(null); // Initialize as null or empty object
  const [domains, setDomains] = useState<DomainData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const { userId } = useParams();
  console.log(userId);
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
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData2() {
      const userId = 3;
      const res = await get(
        `http://localhost:3001/api/userSkills/alluserskillsdomains${userId}`
      );
      const values = await res;

      const uniqueDomains = Array.from(
        new Set(values.map((item) => item.domaine))
      ); // put them in set cause set doesn't allow duplicated values

      setDomains(uniqueDomains.map((domain) => ({ domain })));

      const userSkills = values.map((item) => ({
        skill: item.skillName,
      }));

      setSkills(userSkills);
    }

    fetchData2();
  }, []);
  useEffect(() => {
    async function fetchData3() {
      const res = await get(
        `http://localhost:3001/api/project/userProjectsCounts/${userId}`
      );
      setProjectsCount(res.projectCount);
    }

    fetchData3();
  }, []);

  return (
    <div className="mt-[50px] w-full bg-white overflow-hidden flex items-center justify-center pt-0 px-0 pb-[0.2px] box-border leading-[normal] tracking-[normal]">
      <SideBar></SideBar>
      <div className=" w-full flex flex-col items-center justify-center">
        <PortfolioHeader
          nickname={user?.nickname}
          jobTitle={user?.jobTitle}
        ></PortfolioHeader>
        <PortfolioStatistics projectCount={projectsCount}></PortfolioStatistics>
        <PortfolioAboutMe
          bio={user?.bio}
          description={user?.description}
        ></PortfolioAboutMe>
        <PortfolioServices domains={domains}></PortfolioServices>
        <PortfolioSkills skills={skills}></PortfolioSkills>
        <PortfolioTestimonials userId={userId}></PortfolioTestimonials>
      </div>
      {/* footer to put here  */}
    </div>
  );
};

export default Portfolio;
