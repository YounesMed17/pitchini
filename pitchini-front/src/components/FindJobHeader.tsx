import { FunctionComponent, useCallback, useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
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
interface UserSkillsRelationAttributes {
  skills_id: number;
  userId: number;
}
interface ProjectsServicesListAttributes {
  serviceId: number;
  projectId: number;
}
interface SkillsAttributes {
  id: number;
  domaine: string;
  skillName: string;
}
interface ServicesAttributes {
  id: number;
  domaine: string;
  service: string;
  price: string;
}
interface UserProjectsRelationAttributes {
  userId: number;
  projectId: number;
}
interface FrameComponentProps {
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
  projects: ProjectData[];
  setProjects: (projects: ProjectData[]) => void;
  projectsWork: ProjectData[];
  setProjectsWork: (projects: ProjectData[]) => void;
  userId: string; // Déclarer la prop userId
}

const FindJobHeader: FunctionComponent<FrameComponentProps> = ({
  activeTab,
  setActiveTab,
  userId,
  projects,
  setProjects,
  setProjectsWork,
  projectsWork,
}) => {
  const [skills, setSkills] = useState<UserSkillsRelationAttributes[]>([]);
  const [projectServices, setProjectServices] = useState<
    ProjectsServicesListAttributes[]
  >([]);
  const [allSkills, setAllSkills] = useState<SkillsAttributes[]>([]);
  const [allServices, setAllServices] = useState<ServicesAttributes[]>([]);

  const [filteredServices, setFilteredServices] = useState<
    ServicesAttributes[]
  >([]);
  const [ids, setIds] = useState<Number[]>([]);
  const [domaines, setDomaines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

  const [showResults, setShowResults] = useState(false); // Etat pour afficher/masquer les résultats de la recherche
  // Fonction pour récupérer les compétences de l'utilisateur

  useEffect(() => {
    setShowResults(filteredProjects.length > 0);
  }, [filteredProjects]);
  const fetchSkillsByUser = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing in the URL");
        return;
      }
      const response = await fetch(
        `http://localhost:3001/api/userSkills/${userId}`
      );
      if (!response.ok) {
        console.error("Failed to fetch skills");
        return;
      }
      const userSkills = await response.json();
      setSkills(userSkills);
    } catch (error) {
      console.error("Error fetching user skills:", error);
    }
  };

  // Fonction pour récupérer toutes les compétences
  const fetchAllSkills = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/skills/all`);
      if (!response.ok) {
        console.error("Failed to fetch all skills");
        return;
      }
      const skills = await response.json();
      setAllSkills(skills);
    } catch (error) {
      console.error("Error fetching all skills:", error);
    }
  };

  // Fonction pour récupérer tous les services
  const fetchAllServices = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/services/all`);
      if (!response.ok) {
        console.error("Failed to fetch all services");
        return;
      }
      const services = await response.json();
      setAllServices(services);
    } catch (error) {
      console.error("Error fetching all services:", error);
    }
  };

  // Fonction pour récupérer tous les projets services list
  const fetchProjectServicesList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/projectServicesList/all`
      );
      if (!response.ok) {
        console.error("Failed to fetch all project services list");
        return;
      }
      const projectserviceslist = await response.json();
      setProjectServices(projectserviceslist);
    } catch (error) {
      console.error("Error fetching project services list:", error);
    }
  };

  // Effet pour récupérer les compétences de l'utilisateur
  useEffect(() => {
    if (activeTab === 1) fetchSkillsByUser();
  }, [userId, activeTab]);

  // Effet pour récupérer toutes les compétences
  useEffect(() => {
    if (activeTab === 1) fetchAllSkills();
  }, [activeTab]);

  // Effet pour récupérer tous les services
  useEffect(() => {
    if (activeTab === 1) fetchAllServices();
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === 1) fetchProjectServicesList();
  }, [activeTab]);

  // Effet pour filtrer les services en fonction des domaines des compétences de l'utilisateur
  useEffect(() => {
    if (activeTab === 1) {
      const filteredDomaines = allSkills
        .filter((skill) =>
          skills.some((userSkill) => userSkill.skills_id === skill.id)
        )
        .map((skill) => skill.domaine);
      setDomaines(filteredDomaines);
    }
  }, [skills, allSkills, activeTab]);

  // Effet pour filtrer les services en fonction des domaines
  useEffect(() => {
    if (activeTab === 1) {
      const filteredServices = allServices.filter((service) =>
        domaines.includes(service.domaine)
      );
      setFilteredServices(filteredServices);
    }
  }, [allServices, domaines, activeTab]);

  // Effet pour mettre à jour les IDs des services filtrés
  useEffect(() => {
    if (activeTab === 1) {
      const servicesIds = filteredServices.map((service) => service.id);
      setIds(servicesIds);
    }
  }, [filteredServices, activeTab]);
  useEffect(() => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(ids);
  }, [ids]);
  // Effet pour filtrer les projets en fonction des services associés aux compétences de l'utilisateur
  useEffect(() => {
    if (activeTab === 1) {
      const filteredProjectIds = projectServices
        .filter((projectService) => ids.includes(projectService.serviceId))
        .map((projectService) => projectService.projectId);
      const filteredProjects = projects.filter((project) =>
        filteredProjectIds.includes(project.id)
      );
      setProjectsWork(filteredProjects);
    }
  }, [projectServices, ids, projects, activeTab]);
  useEffect(() => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(projectsWork);
  }, [projectsWork]);

  const onBestMatchesClick = useCallback(() => {
    setActiveTab(1);
  }, []);

  const onMostRecentTextClick = useCallback(() => {
    setActiveTab(2);
    setProjectsWork(projects);
    const sortedProjects = [...projectsWork].sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
    console.log(sortedProjects);
    setProjectsWork(sortedProjects);
  }, []);

  useEffect(() => {
    if (activeTab === 2) {
      setProjectsWork(projects);
    }
  }, [projectsWork, activeTab]);
  const onSavedJobsTextClick = useCallback(async () => {
    setActiveTab(3);
    try {
      const savedProjectsResponse = await fetch(
        `http://localhost:3001/api/userProjectRelation/${userId}`
      );
      if (!savedProjectsResponse.ok) {
        throw new Error("Failed to fetch saved projects");
      }
      const savedProjects = await savedProjectsResponse.json();

      // Récupérer tous les projets publiés
      const allProjectsResponse = await fetch(
        "http://localhost:3001/api/project/allProjects"
      );
      if (!allProjectsResponse.ok) {
        throw new Error("Failed to fetch all projects");
      }
      const allProjects = await allProjectsResponse.json();

      // Filtrer les projets publiés pour ceux qui existent dans les projets enregistrés
      const projectsWork = allProjects.filter((project: ProjectData) =>
        savedProjects.some(
          (savedProject: UserProjectsRelationAttributes) =>
            savedProject.projectId === project.id
        )
      );

      // Mettre à jour l'état avec les projets filtrés
      setProjectsWork(projectsWork);
      setActiveTab(3);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);
  useEffect(() => {
    onSavedJobsTextClick();
  }, [onSavedJobsTextClick]);
  //serach...
  const searchProjects = useCallback(() => {
    const filtered = projects.filter((project) => {
      // Filtrer par nom et description
      const nameMatch = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = project.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Retourner vrai si le projet correspond à l'un des critères de recherche
      return nameMatch || descriptionMatch;
    });
    setFilteredProjects(filtered);
  }, [projects, searchTerm]);

  // Effet pour déclencher la recherche à chaque changement de terme de recherche

  return (
    <div className="relative top-0 self-stretch flex flex-col items-end justify-start gap-[8.3px] max-w-full text-left text-30xl-1 text-gray-1600 font-titre-grey">
      <div className="w-[184.4px] h-0 flex flex-row items-start justify-center py-0 px-5 box-border">
        <div className="h-0 w-0 relative bg-[url('/public/frame-3@3x.png')] bg-cover bg-no-repeat bg-[top]">
          <img
            className="absolute top-[0px] left-[0px] w-0 h-0 object-cover hidden"
            alt=""
            src="/frame-3@3x.png"
          />
          <img
            className="absolute top-[0px] left-[0px] w-0 h-0 object-cover"
            loading="lazy"
            alt=""
            src="/frame-3@3x.png"
          />
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq1050:flex-wrap mq1050:justify-center">
        <div className="w-[649.3px] flex flex-col items-start justify-start gap-[38.5px] max-w-full mq750:gap-[19px_38.5px]">
          <div className="self-stretch flex flex-row items-start justify-end max-w-full">
            <div className="h-[114px] w-[601.4px] relative tracking-[0.02em] leading-[131%] font-extrabold text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0 max-w-full box-border pl-5 mq450:text-10xl mq450:leading-[39px] mq1050:text-20xl mq1050:leading-[51px]">
              Professional Options Matching Your Skills
            </div>
          </div>
          <div className="w-[633.5px] flex flex-row items-start justify-between gap-[20px] max-w-full text-justify text-5xl-2 mq750:flex-wrap">
            <div
              className={`h-[44.6px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center cursor-pointer mq450:text-lgi mq450:leading-[28px] hover:underline ${
                activeTab === 1 ? "underline" : ""
              }`}
              onClick={onBestMatchesClick}
            >
              Best Matches
            </div>
            <div
              className={`h-[44.6px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center cursor-pointer mq450:text-lgi mq450:leading-[28px] hover:underline ${
                activeTab === 2 ? "underline" : ""
              }`}
              onClick={onMostRecentTextClick}
            >
              Most Recent
            </div>
            <div
              className={`h-[44.6px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center cursor-pointer mq450:text-lgi mq450:leading-[28px] hover:underline ${
                activeTab === 3 ? "underline" : ""
              }`}
              onClick={onSavedJobsTextClick}
            >
              Saved Jobs
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-start justify-start gap-2">
          <TextField
            className="w-full bg-transparent outline-none font-light font-montserrat text-sm text-dimgray-400 border-none"
            placeholder="SEARCH ..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (searchTerm != "") {
                if (e.key === "Enter") {
                  searchProjects(); // Appeler handleSearch lorsque la touche Entrer est enfoncée
                  // Faire défiler la page en douceur jusqu'à l'élément avec la classe "search-results"
                  const searchResultsElement =
                    document.querySelector(".search-results");
                  if (searchResultsElement) {
                    window.scroll({
                      top:
                        searchResultsElement.getBoundingClientRect().top +
                        window.pageYOffset,
                      behavior: "smooth",
                    });
                  }
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={searchTerm !== "" ? searchProjects : undefined}
                  size="small"
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FindJobHeader;
