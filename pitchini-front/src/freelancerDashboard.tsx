import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { get } from "./utilFunctions/getData";
import { useEffect, useState } from "react";
import ColumnDirection3 from "./components/ColumnDirection3";
import Charts from "./components/Charts";
import SideBar from "./components/SideBar";

interface Project {
  id: number;
  title: string;
  description: string;
  totalPrice: number;
  status: "inProgress" | "done"; // Assuming status can only be one of these values
  finishedDate: Date;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const [inProgressProjects, setInProgressProjects] = useState<Project[]>([]);
  const [doneProjects, setDoneProjects] = useState<Project[]>([]);

  const getMonthName = (date: Date): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[date.getMonth()];
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const month: string[] = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    month.unshift(monthName);
  }

  useEffect(() => {
    async function fetchData() {
      const userId = 3;
      const res = await get(
        `http://localhost:3001/api/project/userProjects${userId}`
      );
      const values = await res;

      const projectList: Project[] = values.map((item: any) => ({
        title: item.name,
        description: item.description,
        totalPrice: item.totalPrice,
        deadLine: item.deadLine,
        status: item.status,
        finishedDate: new Date(item.finishedDate),
        id: item.id,
      }));

      const inProgress = projectList.filter(
        (project) => project.status === "inProgress"
      );
      setInProgressProjects(inProgress);

      const done = projectList.filter((project) => project.status === "done");
      setDoneProjects(done);
    }

    fetchData();
  }, []);

  function monthSalarySum(month: string): number {
    let sum = 0;
    doneProjects.forEach((item) => {
      if (getMonthName(item.finishedDate) === month) {
        sum += item.totalPrice;
      }
    });
    return sum;
  }

  const monthsWithSalaries: number[] = month.map((monthName) => {
    const salary = monthSalarySum(monthName);
    return salary;
  });

  const data = {
    labels: month,
    datasets: [
      {
        label: "Dataset 1",
        data: monthsWithSalaries.slice(0, 12),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const customScrollbarStyle: React.CSSProperties = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  // Type assertion to add vendor-specific style
  (customScrollbarStyle as any)["&::-webkit-scrollbar"] = { display: "none" };

  // const [open, setOpen] = React.useState(true);

  const [showDone, setShowDone] = useState(false);

  function handleDoneProjects() {
    setShowDone(true);
  }

  function handleInProgressProjects() {
    setShowDone(false);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar></SideBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="md:ml-[50px] ml-[5px]"
      >
        <DrawerHeader />
        <div className="mb-[50px] flex flex-row items-start justify-start ml-[50px] text-left text-13xl text-dimgray-400">
          <div className="tracking-[0.02em]  leading-[131%] font-extrabold !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block h-[89px] shrink-0">
            <p className="m-0">The Only Place To</p>
            <p className="m-0">Look For Your Projets</p>
          </div>
        </div>
        <div className="flex flex-col justify-start  items-start flex-wrap">
          <div className="flex gap-[35px]">
            <div
              className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
              onClick={handleDoneProjects}
            >
              Done Projects
            </div>

            <div
              className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
              onClick={handleInProgressProjects}
            >
              In Progress Projects
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div
              style={customScrollbarStyle}
              className={
                !showDone
                  ? "custom-scrollbar w-screen max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-5"
                  : "hidden"
              }
            >
              {inProgressProjects.map((project) => (
                <div key={project.id}>
                  {" "}
                  <ColumnDirection3
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    totalPrice={project.totalPrice}
                    projectId={project.id}
                    status={project.status}
                    userRole="freelancer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div
              style={customScrollbarStyle}
              className={
                showDone
                  ? "custom-scrollbar w-screen max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-5"
                  : "hidden"
              }
            >
              {doneProjects.map((project) => (
                <div key={project.id}>
                  <ColumnDirection3
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    totalPrice={project.totalPrice}
                    projectId={project.id}
                    status={project.status}
                    userRole="freelancer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-[700px] sm:w-300 w-150">
          <Charts data={data} />
        </div>
      </Box>
    </Box>
  );
}
