import { FunctionComponent, useEffect, useState } from "react";

import SideBar from "./components/SideBar";
import PortfolioHeader from "./components/PortfolioHeader";
import PortfolioStatistics from "./components/PortfolioStatistics";
import PortfolioAboutMe from "./components/PortfolioAboutMe";
import PortfolioServices from "./components/PortfolioService";
import PortfolioSkills from "./components/PortfolioSkills";
import PortfolioTestimonials from "./components/PortfolioTestimonials";
import { get } from "./utilFunctions/getData";
//import PortfolioProjects from "./components/PortfolioProjects";

const Portfolio: FunctionComponent = () => {
  const [user, setUser] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userId = 3;
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
    async function fetchData() {
      const userId = 3;
      const res = await get(
        `http://localhost:3001/api/userSkills/alluserskillsdomains${userId}`
      );
      const values = await res;

      const userDomains = values.map((item) => ({
        domain: item.domaine,
      }));
      const userSkills = values.map((item) => ({
        skill: item.skillName,
      }));

      setSkills(userSkills);

      setDomains(userDomains);
    }

    fetchData();
  }, []);

  return (
    <div className="mt-[50px] w-full bg-white overflow-hidden flex items-center justify-center pt-0 px-0 pb-[0.2px] box-border leading-[normal] tracking-[normal]">
      <SideBar></SideBar>
      <div className=" w-full flex flex-col items-center justify-center">
        <PortfolioHeader></PortfolioHeader>
        <PortfolioStatistics></PortfolioStatistics>
        <PortfolioAboutMe></PortfolioAboutMe>
        <PortfolioServices></PortfolioServices>
        <PortfolioSkills></PortfolioSkills>
        <PortfolioTestimonials></PortfolioTestimonials>
      </div>
      {/* footer to put here  */}
    </div>
  );
};

export default Portfolio;
