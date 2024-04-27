import { FunctionComponent, useEffect, useState } from "react";
import CTAButton from "./components/CTAButton";
import NavBar from "./components/NavBar1";
import ColumnDirection3 from "./components/ColumnDirection3";
import { get } from "./utilFunctions/getData";
import Charts from "./components/Charts";

const Dashboard2: FunctionComponent = () => {
  /*
  const onMaskGroupIconClick = useCallback(() => {
    // Please sync "Portfolio Freelancer" to the project
  }, []);

  const onMaskGroupIcon2Click = useCallback(() => {
    // Please sync "Portfolio Freelancer" to the project
  }, []);

  const onMaskGroupIcon3Click = useCallback(() => {
    // Please sync "Portfolio Freelancer" to the project
  }, []);
*/

  const [projects, setProjects] = useState<any[]>([]);
  const [inProgressProjects, setInProgressProjects] = useState<any[]>([]);
  const [doneProjects, setDoneProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [domaine1, setDomaine1] = useState("");
  const [domaine2, setDomaine2] = useState("");

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
      setDomaine1(values[0].domaine);
      if (values.length == 2) setDomaine2(values[1].domaine);

      const userSkills = values.map((item) => ({
        skill: item.skillName,
      }));

      setSkills(userSkills);
    }

    fetchData();
  }, []);
  console.log(domaine2 + "ddd" + domaine1);
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
  const customScrollbarStyle = {
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
    "&::WebkitScrollbar": { display: "none" }, // WebKit/Blink
  };
  return (
    <div className="w-full  relative bg-white h-[1142px] overflow-hidden text-justify text-mid text-gray-200 font-titre-grey">
      <div className="absolute top-[360px] left-[318.7px] w-[225.1px] h-[45px]" />
      <div className="absolute top-[80px] left-[0px] bg-whitesmoke-300 h-[1073px] overflow-hidden flex flex-row items-start justify-start gap-[7.5px] text-center text-[25.4px]">
        <img
          className="w-[214.6px] relative h-[1886.8px] z-[0]"
          alt=""
          src="/group-513170.svg"
        />
        <div className="!m-[0] absolute top-[61.4px] left-[calc(50%_-_102.8px)] flex flex-col items-center justify-start gap-[54.6px] z-[1]">
          <div className="flex flex-col items-center justify-start gap-[9px]">
            <img
              className="w-[143.7px] relative h-[143.7px] object-cover"
              alt=""
              src="/image6@2x.png"
            />
            <div className="w-[204.8px] relative tracking-[-0.01em] font-semibold flex items-center justify-center h-[28.1px] shrink-0">
              Danish S.
            </div>
            <div className="w-[186.2px] relative text-xs tracking-[-0.01em] leading-[145.45%] font-light text-gray-1600 flex items-center justify-center h-[15px] shrink-0">
              Lorem@gmail.com
            </div>
          </div>
          <CTAButton />
        </div>
      </div>
      <NavBar />
      <div className="absolute top-[244.3px] left-[289px] flex flex-col items-start justify-start text-gray-1600">
        <div className="flex flex-row items-start justify-start gap-[44px]">
          <div className="w-[113px] relative tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] flex items-center h-11 shrink-0">
            All projects
          </div>
          <div className="w-36 relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center h-11 shrink-0">
            Current projects
          </div>
          <div className="w-[154px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center h-11 shrink-0">
            Finished projects
          </div>
        </div>
      </div>
      <div
        style={customScrollbarStyle}
        className=" custom-scrollbar absolute top-[296.3px] left-[289px] h-[361px] flex flex-col  items-start justify-start gap-[7px] overflow-x-auto "
      >
        {inProgressProjects.map((project) => (
          <ColumnDirection3
            title={project.title}
            description={project.description}
            tasks="12 tasks | 61% done"
            totalPrice={project.totalPrice}
          />
        ))}
      </div>
      <div
        style={customScrollbarStyle}
        className="absolute top-[296.3px] left-[50%] h-[361px] flex flex-col  items-start justify-start gap-[7px] overflow-x-auto "
      >
        {doneProjects.map((project) => (
          <ColumnDirection3
            title={project.title}
            description={project.description}
            tasks="12 tasks | 61% done"
            totalPrice={project.totalPrice}
          />
        ))}
      </div>
      <div className="absolute top-[683px] left-[289px] h-[25px] flex flex-row items-center justify-center">
        <div className="relative tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] ">
          Tasks for today
        </div>
      </div>
      <div className="absolute top-[683px] left-[764.3px] h-[25px] flex flex-row items-center justify-center">
        <div className="relative tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text]">
          Domains
        </div>
      </div>
      <div className="absolute top-[735px] left-[289px] h-[183px] flex flex-row items-start justify-start gap-[24px] text-left text-base text-title">
        <div className="w-[451px] relative h-[168px]">
          <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[10px]">
            <div className="flex flex-row items-start justify-start z-[0]">
              <div className="w-5 relative rounded-tl-[7.48px] rounded-tr-none rounded-br-none rounded-bl-[7.48px] bg-blue h-[50px]" />
              <div className="w-[431px] relative shadow-[3px_3px_17.58px_rgba(0,_0,_0,_0.09)] bg-white h-[50px]" />
            </div>
            <div className="!m-[0] absolute top-[6px] left-[33px] flex flex-row items-center justify-start gap-[247px] z-[1]">
              <div className="w-[107px] flex flex-col items-start justify-start">
                <div className="w-[220px] relative leading-[113%] font-semibold flex items-center h-[23px] shrink-0">
                  task1
                </div>
                <div className="w-[215px] relative text-2xs tracking-[-0.01em] leading-[145.45%] font-light text-gray-1600 text-justify flex items-center h-4 shrink-0">
                  task 1 description
                </div>
              </div>
              <div className="w-[35.2px] relative rounded-[50%] bg-b h-[35.9px] opacity-[0.41]" />
            </div>
          </div>
          <div className="absolute top-[59px] left-[0px] flex flex-col items-start justify-start gap-[10px]">
            <div className="flex flex-row items-start justify-start z-[0]">
              <div className="w-5 relative rounded-tl-[7.48px] rounded-tr-none rounded-br-none rounded-bl-[7.48px] bg-orange h-[50px]" />
              <div className="w-[431px] relative shadow-[3px_3px_17.58px_rgba(0,_0,_0,_0.09)] bg-white h-[50px]" />
            </div>
            <div className="!m-[0] absolute top-[6px] left-[33px] flex flex-row items-center justify-start gap-[247px] z-[1]">
              <div className="w-[107px] flex flex-col items-start justify-start">
                <div className="w-[220px] relative leading-[113%] font-semibold flex items-center h-[23px] shrink-0">
                  UX Wireframe
                </div>
                <div className="w-[215px] relative text-2xs tracking-[-0.01em] leading-[145.45%] font-light text-gray-1600 text-justify flex items-center h-4 shrink-0">
                  Design Ux Wireframe
                </div>
              </div>
              <div className="w-[35.2px] relative rounded-[50%] bg-b h-[35.9px] opacity-[0.41]" />
            </div>
          </div>
          <div className="absolute top-[118px] left-[0px] flex flex-col items-start justify-start gap-[10px]">
            <div className="flex flex-row items-start justify-start z-[0]">
              <div className="w-5 relative rounded-tl-[7.48px] rounded-tr-none rounded-br-none rounded-bl-[7.48px] bg-blue h-[50px]" />
              <div className="w-[431px] relative shadow-[3px_3px_17.58px_rgba(0,_0,_0,_0.09)] bg-white h-[50px]" />
            </div>
            <div className="!m-[0] absolute top-[6px] left-[33px] flex flex-row items-start justify-start gap-[247px] z-[1]">
              <div className="flex flex-row items-center justify-start">
                <div className="w-[107px] flex flex-col items-start justify-start">
                  <div className="w-[220px] relative leading-[113%] font-semibold flex items-center h-[23px] shrink-0">
                    Mobile App
                  </div>
                  <div className="w-[215px] relative text-2xs tracking-[-0.01em] leading-[145.45%] font-light text-gray-1600 text-justify flex items-center h-4 shrink-0">
                    Research
                  </div>
                </div>
              </div>
              <img
                className="w-10 relative h-[37.4px]"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col relative items-start justify-start gap-[8px] text-lg text-orange">
          <div className="h-[87px] flex flex-row items-start justify-start gap-[12px]">
            <div className="shadow-[3px_3px_17.58px_rgba(0,_0,_0,_0.09)] rounded-[7.48px] bg-white overflow-hidden flex flex-col items-start justify-start py-[13px] px-[31px] border-[0.7px] border-solid border-dgrad-color">
              <div className="flex flex-row items-center justify-start gap-[40px]">
                <img
                  className="w-[52px] relative h-[49px] object-cover"
                  alt=""
                  src="/icon04-1@2x.png"
                />
                <div className="w-[127.9px] relative leading-[105%] uppercase  font-medium flex justify-center items-center h-[20.2px] shrink-0">
                  {domaine1}
                </div>
              </div>
            </div>
            <div
              className={
                domaine2 == ""
                  ? "hidden"
                  : "shadow-[3px_3px_17.58px_rgba(0,_0,_0,_0.09)] rounded-[7.48px] bg-white overflow-hidden flex flex-col items-start justify-start py-[13px] px-[31px] border-[0.7px] border-solid border-dgrad-color"
              }
            >
              <div className="flex flex-row items-center justify-start gap-[40px]">
                <img
                  className="w-[52px] relative h-[49px] object-cover"
                  alt=""
                  src="/icon04-1@2x.png"
                />
                <div className="w-[127.9px] relative leading-[105%] uppercase  font-medium flex justify-center items-center h-[20.2px] shrink-0">
                  {domaine2}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[133px] left-[289px] flex flex-row items-start justify-start gap-[341px] text-left text-13xl text-dimgray-400">
        <div className="w-[576px] relative tracking-[0.02em] leading-[131%] font-extrabold text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block h-[89px] shrink-0">
          <p className="m-0">The Only Place To</p>
          <p className="m-0">Look For Your Projets</p>
        </div>
        <div className="flex flex-col items-center justify-start text-xs font-montserrat">
          <img
            className="w-0 relative h-0 object-cover"
            alt=""
            src="/frame-3@3x.png"
          />
          <img
            className="w-0 relative h-0 object-cover mt-[-8px]"
            alt=""
            src="/frame-3@3x.png"
          />
          <div className="w-[155.4px] relative h-[41.4px] mt-[-8px]">
            <div className="absolute top-[0px] left-[0px] w-[155.4px] h-[41.4px]">
              <div className="absolute top-[0px] left-[0px] rounded-[5.98px] bg-gainsboro-200 overflow-hidden flex flex-col items-start justify-start py-2 px-1.5 border-[0.7px] border-solid border-grey">
                <div className="flex flex-row items-center justify-start gap-[2px]">
                  <img
                    className="w-[25.4px] relative h-[20.2px] object-cover opacity-[0.38]"
                    alt=""
                    src="/vecteezy-notificationiconsvectordesign-10654946-converti05-1@2x.png"
                  />
                  <div className="w-[115.9px] relative leading-[120%] font-light flex items-center h-[25.4px] shrink-0">
                    <span className="w-full">
                      S<span className="lowercase">EARCH ...</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[800px] absolute top-[800px]  ">
          <Charts data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
