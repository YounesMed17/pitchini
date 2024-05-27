import { FunctionComponent, useEffect, useState } from "react";
import { get } from "../utilFunctions/getData";
import { Container, Rating } from "@mui/material";
import { send } from "../utilFunctions/sendData";

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

interface ApplyProjectPopupProps {
  projectId: number;
  freelancerId: number;
  setOpen2: any;
}

const ApplyProjectPopup: FunctionComponent<ApplyProjectPopupProps> = ({
  projectId,
  freelancerId,
  setOpen2,
}) => {
  const [projectWork, setProjectWork] = useState<ProjectData | null>(null);
  const [avgRate, setAvgRate] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // Fetch project data by projectId
      const project = await get(
        `http://localhost:3001/api/project/${projectId}`
      );
      setProjectWork(project);

      // Fetch average rate of the client
      const avgRateResponse = await get<number>(
        `http://localhost:3001/api/rate/avg/${project.clientId}`
      );
      setAvgRate(Math.round(avgRateResponse * 2) / 2);
    }

    fetchData();
  }, [projectId]);
  function navigating() {}

  async function apply() {
    await send(
      false,
      { freelancerId, projectId },
      navigating,
      "http://localhost:3001/api/projectApplicants/"
    );
    await send(
      false,
      {
        message: "A freelancer applied for your job",
        type: "Project update",
        userId: 25, //client who posted the project
        freelancerId: 1, // freelancer who applied for the project
      },
      navigating,
      "http://localhost:3001/api/notification/"
    );
    setOpen2(false);
  }

  if (!projectWork) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="md:p-[50px]  bg-[#ddeefd]">
      <div className="grid grid-cols-2 gap-4 p-8 rounded-lg md:w-[590px] w-[350px]  h-[300px] ml-[-25px] mb-[-55px]">
        <div>
          <div className="text-blue h-[36px] text-lg font-semibold flex items-center">
            Project Title
          </div>
          <div className="text-base leading-relaxed font-light text-black text-justify">
            {projectWork.name}
          </div>
        </div>
        <div>
          <div className="text-lg font-medium flex font-semibold items-center  text-blue">
            Project description
          </div>
          <div className="text-base leading-relaxed font-light text-black text-justify">
            {projectWork.description}
          </div>
        </div>
        <div>
          <div className="text-lg font-medium flex items-center font-semibold text-blue">
            DeadLine
          </div>
          <div className="text-base leading-relaxed font-light text-black text-justify">
            {new Date(projectWork.deadLine).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-lg font-medium flex items-center font-semibold text-blue">
            Project price
          </div>
          <div className="text-base leading-relaxed font-light text-black text-justify">
            {projectWork.totalPrice} DT
          </div>
        </div>
        <div>
          <div className="text-lg font-medium flex items-center font-semibold text-blue">
            Client average rate
          </div>
          <div className="text-base leading-relaxed font-light text-black text-justify">
            <Rating
              name="half-rating-read"
              value={avgRate}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={apply}
          className="cursor-pointer border p-3 bg-transparent text-orange border-dgrad-color"
        >
          Apply Now
        </button>
      </div>
    </Container>
  );
};

export default ApplyProjectPopup;
