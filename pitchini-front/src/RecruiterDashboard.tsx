import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { get } from "./utilFunctions/getData";
import { useEffect, useState } from "react";
import ColumnDirection3 from "./components/ColumnDirection3";
import Charts from "./components/Charts";
import LeftNav from "./components/sidedBar";
import { Rating } from "@mui/material";
import SideBar from "./components/SideBar";
import Nav from "./components/Nav";

interface Project {
  id: number;
  title: string;
  description: string;
  totalPrice: number;
  status: "inProgress" | "done" | "onHold"; // Assuming status can only be one of these values
  finishedDate: Date;
  freelancerId: number;
}
interface User {
  id: number;
  avatar: string;
  nickname: string;
  rate: number;
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
  const [notAssigned, setNotAssigned] = useState<Project[]>([]);
  const [workedWithFreelancers, setWorkedWithFreelancers] = useState<User[]>(
    []
  );

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
      const userId = 25;
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
        freelancerId: item.freelancerId,
      }));

      const inProgress = projectList.filter(
        (project) => project.status === "inProgress"
      );
      setInProgressProjects(inProgress);

      const done = projectList.filter((project) => project.status === "done");
      setDoneProjects(done);

      const NotAssigned = projectList.filter(
        (project) => project.status === "onHold"
      );
      setNotAssigned(NotAssigned);
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

  const [showDone, setShowDone] = useState(true);
  const [showNot, setShowNot] = useState(false);
  console.log(showNot);
  function handleDoneProjects() {
    setShowDone(true);
    setShowNot(false);
  }

  function handleInProgressProjects() {
    setShowDone(false);
    setShowNot(false);
  }

  function handleNotAssignedProjects() {
    setShowNot(true);
    setShowDone(false);
  }
  const user = { nickname: "amiro" };

  async function getRate(id: number) {
    const res = await get(`http://localhost:3001/api/rate/avg/${id}`);
    console.log(res, id, "apapapap");
    return res;
  }
  useEffect(() => {
    async function fetchData() {
      const freelancersMap = new Map();

      for (let i = 0; i < doneProjects.length; i++) {
        const res = await get(
          `http://localhost:3001/api/user/${doneProjects[i].freelancerId}`
        );
        const values = await res;
        const rate = await getRate(values.id);

        const freelancer = {
          id: values.id,
          avatar: values.avatar,
          nickname: values.nickname,
          rate: rate,
        };

        // Add freelancer to the map if it doesn't already exist
        if (!freelancersMap.has(values.id)) {
          freelancersMap.set(values.id, freelancer);
        }
      }

      // Convert the map values to an array and set the state
      setWorkedWithFreelancers(Array.from(freelancersMap.values()));
    }
    fetchData();
  }, [doneProjects]);

  console.log(workedWithFreelancers, "zzzzzzzzzzzzzzzzzzzzzzzzzzzz");

  return (
    <Box sx={{ display: "flex" }}>
      <Nav></Nav>
      <LeftNav user={user} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="md:ml-[50px] ml-[5px]"
      >
        <DrawerHeader />
        <div className="mb-[50px] mt-[50px] flex flex-row items-start justify-start ml-[50px] text-left text-13xl text-dimgray-400">
          <div className="tracking-[0.02em]  leading-[131%] font-extrabold !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block h-[89px] shrink-0">
            <p className="m-0">The Only Place To</p>
            <p className="m-0">Look For Your Projets</p>
          </div>
        </div>
        <div className="flex flex-col justify-start  items-start flex-wrap">
          <div className="flex flex-col gap-[35px]">
            <div className="flex flex-col justify-start items-start">
              <div
                className="tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
                onClick={handleInProgressProjects}
              >
                In Progress Projects
              </div>
              <div
                style={customScrollbarStyle}
                className="custom-scrollbar w-screen max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-5"
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
                      userRole="recruiter"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div
                className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
                onClick={handleDoneProjects}
              >
                Done Projects
              </div>
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
                      userRole="recruiter"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div
                className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
                onClick={handleNotAssignedProjects}
              >
                Not assigned Projects
              </div>
              <div
                style={customScrollbarStyle}
                className="custom-scrollbar w-screen max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-5"
              >
                {notAssigned.map((project) => (
                  <div key={project.id}>
                    {" "}
                    <ColumnDirection3
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      totalPrice={project.totalPrice}
                      projectId={project.id}
                      status={project.status}
                      userRole="recruiter"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[700px] sm:w-300 w-150">
          <Charts data={data} />
        </div>
        <div>
          <div className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0">
            Freelancers you worked with
          </div>
          <div className="flex gap-[50px] flex-wrap">
            {workedWithFreelancers.map((user, index) => (
              <div key={index} className="flex justify-center items-center">
                <img src={user.avatar} width="50px" height="50px" alt="" />
                <div>
                  <p className="font-bold">{user.nickname}</p>
                  <Rating
                    name="half-rating-read"
                    value={user.rate}
                    precision={0.5}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
}
