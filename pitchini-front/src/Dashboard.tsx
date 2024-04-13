import React, { FunctionComponent, useEffect, useState } from "react";
import EnTete from "./components/EnTete";
import { get } from "./utilFunctions/getData";
import Charts from "./components/Charts";

const LandingPage: FunctionComponent = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [inProgressProjects, setInProgressProjects] = useState<any[]>([]);
  const [doneProjects, setDoneProjects] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

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
  const month = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    month.unshift(monthName);
  }

  // Now monthsWithSalaries array contains objects representing each month with its associated salary

  useEffect(() => {
    async function fetchData() {
      const userId = 3;
      const res = await get(
        `http://localhost:3001/api/project/userProjects${userId}`
      );
      const values = await res;

      const projectList = values.map((item) => ({
        title: item.name,
        description: item.description,
        totalPrice: item.totalPrice,
        deadLine: item.deadLine,
        status: item.status,
        finishedDate: new Date(item.finishedDate),
      }));
      setProjects(projectList);

      const inProgress = projectList.filter(
        (project) => project.status === "inProgress"
      );
      setInProgressProjects(inProgress);

      const done = projectList.filter((project) => project.status === "done");
      setDoneProjects(done);
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
  console.log(skills);
  function monthSalarySum(month: string) {
    console.log(month);
    let sum = 0;
    doneProjects.forEach((item) => {
      getMonthName(item.finishedDate) == month ? (sum += item.totalPrice) : "";
    });
    return sum;
  }

  const monthsWithSalaries = month.map((monthName) => {
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
  return (
    <div className="">
      <EnTete />
      <div>
        <h2>All Projects</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <strong>Project title :</strong> {project.title} -{" "}
              <strong>Project description :</strong> {project.description} -{" "}
              <strong>Total price :</strong> {project.totalPrice} -{" "}
              <strong>Finished Month :</strong>
              {getMonthName(project.finishedDate)}
            </li>
          ))}
        </ul>

        <h2>In Progress Projects</h2>
        <ul>
          {inProgressProjects.map((project, index) => (
            <li key={index}>
              <strong>Project title :</strong> {project.title} -{" "}
              <strong>Project description :</strong> {project.description} -{" "}
              <strong>Total price :</strong> {project.totalPrice}
            </li>
          ))}
        </ul>

        <h2>Done Projects</h2>
        <ul>
          {doneProjects.map((project, index) => (
            <li key={index}>
              <strong>Project title :</strong> {project.title} -{" "}
              <strong>Project description :</strong> {project.description} -{" "}
              <strong>Total price :</strong> {project.totalPrice}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[800px]">
        <Charts data={data} />
      </div>
    </div>
  );
};

export default LandingPage;
