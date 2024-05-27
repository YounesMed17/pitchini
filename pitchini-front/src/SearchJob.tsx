import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FrameComponent1 from "./components/FrameComponent1";
import FindJobHeader from "./components/FindJobHeader";
import Projet from "./components/Projet";
import Nav from "./components/Nav";
import ApplyProjectPopup from "./components/ApplyProjectsPopup";

interface ProjectData {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  deadLine: Date;
  addedFile: boolean;
  requestQuotation: boolean;
  workingPreference: string;
  category: string;
  totalPrice?: number | null;
  finishedDate?: Date | null;
  freelancerId: number;
  clientId: number;
  isPublished: boolean;
  status: string;
}

const SearchJob: FunctionComponent = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectsWork, setProjectsWork] = useState<ProjectData[]>([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState<number>(1);

  const { id } = useParams();
  console.log(id);
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/project/allProjects"
      );
      if (!response.ok) {
        console.error("Failed to fetch projects");
      }
      const projectsData = await response.json();
      setProjects(projectsData);
      setProjectsWork(projectsData);
      console.log(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Appeler la fonction fetchProjects une fois que le composant est monté
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchuser = async () => {
    try {
      if (!id) {
        console.error("User ID is missing in the URL");
        return;
      }
      const response = await fetch(`http://localhost:3001/api/user/${id}`);
      if (!response.ok) {
        console.error("Failed to fetch user");
      }
      const UserData = await response.json();
      console.log(UserData);
      setUser(UserData);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Appeler la fonction fetchProjects une fois que le composant est monté
  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <div className="w-full relative bg-white shadow-[0px_3px_3.02px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col items-start justify-start ">
      <Nav></Nav>
      <div
        className="w-[114.6px] h-[64.4px] relative box-border hidden border-[0.8px] border-solid border-dgrad-color"
        style={{ top: 0 }}
      />
      <main className="w-[1402.8px] flex flex-row items-end justify-center py-0 pr-5 pl-0 box-border gap-[59.7px] max-w-full lg:flex-wrap mq750:gap-[59.7px_30px]">
        <div className="h-[1489.8px] w-[351.1px] flex flex-col items-start justify-start min-w-[351.0999999999999px] max-w-full lg:flex-1 mq450:min-w-full">
          <div className="self-stretch h-[1489.8px] bg-whitesmoke-300 overflow-hidden shrink-0 flex flex-row items-start justify-start max-w-full z-[1]">
            <FrameComponent1 user={user} />
          </div>

          <div className="self-stretch h-[69.5px] relative bg-lightskyblue z-[2] mt-[-674.3px]" />
        </div>

        <section className="  flex-1 flex flex-col items-start justify-start gap-[24.9px] min-w-[632px] max-w-full text-right text-base-9 text-gray-1600 font-titre-grey mq750:min-w-full">
          <FindJobHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            projects={projects}
            setProjects={setProjects}
            userId={id || ""}
            projectsWork={projectsWork}
            setProjectsWork={setProjectsWork}
          />

          <ApplyProjectPopup
            projectId={74}
            freelancerId={2}
          ></ApplyProjectPopup>
          <div className="mt-[200px]"></div>
        </section>
      </main>
    </div>
  );
};

export default SearchJob;
