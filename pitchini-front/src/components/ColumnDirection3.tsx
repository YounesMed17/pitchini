import { useCallback, useEffect, useState } from "react";
import { Button, Dialog, Slide } from "@mui/material";
import CreateTask from "./CreateTask";
import { get } from "../utilFunctions/getData";
import { set } from "date-fns";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { modifyData } from "../utilFunctions/modifyData";
import { send } from "../utilFunctions/sendData";
import { useNavigate } from "react-router-dom";
const Transition = Slide;

const ColumnDirection3 = ({
  id,
  title,
  description,
  totalPrice,
  projectId,
  status,
  userRole,
}) => {
  const [openD, setOpenD] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState(0);

  async function fetchData() {
    const res = await get(
      `http://localhost:3001/api/toDoList/allProjectTasks/${projectId}`
    );
    const values = await res;

    const tasks = values.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      projectId: item.projectId,
      freelancerId: item.freelancerId,
      isDone: item.isDone,
    }));

    setTasks(tasks);
  }

  useEffect(() => {
    fetchData();

    // Set interval to fetch projects every 3 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let count = 0;
    tasks.forEach((task) => {
      if (task.isDone) {
        count++;
      }
    });
    setDoneTasks(count);
  }, [tasks]);

  const handleClick = () => {
    setOpenD(!openD); // Toggle the openD state
  };
  // Callback function to handle task creation
  const handleTaskCreate = (
    id,
    taskTitle,
    taskDescription,
    freelancerId,
    projectId,
    isDone
  ) => {
    if (taskTitle && taskDescription) {
      const newTask = {
        id,
        title: taskTitle,
        description: taskDescription,
        freelancerId,
        projectId,
        isDone,
      };
      // Update tasks array or perform other logic here
      onNewTask(newTask);
    }
  };
  const [openL, setOpenL] = useState(false);

  const handleClickOpenList = () => {
    setOpenL(true);
  };

  const handleCloseList = () => {
    setOpenL(false);
  };
  async function updateTaskStatus(
    id: number,
    title: string,
    description: string,
    freelancerId: number,
    projectId: number,
    TaskStatus: boolean
  ) {
    await modifyData(
      {
        title: title,
        description: description,
        isDone: TaskStatus,
        projectId: projectId,
        freelancerId: freelancerId,
      },
      `http://localhost:3001/api/toDoList/${id}`
    );
    // notif send
    function navigating() {}
    send(
      false,
      {
        message: `A freelancer modified this task status : ${title}  ${
          TaskStatus
            ? "from in progress to is done"
            : "from done to in progress"
        } `,
        type: "Project update",
        userId: 24, //client who posted the project
        freelancerId: 3, // freelancer who applied for the project
      },
      navigating,
      "http://localhost:3001/api/notification/"
    );
  }
  let navigate = useNavigate();
  const navigating = useCallback(() => {
    navigate(`/FreelancersList/${id}`, {});
  }, [navigate]);
  function handleNavigation() {
    navigating();
  }

  return (
    <div className="mb-[25px] flex flex-col items-start justify-start relative gap-[10px] text-justify text-2xs text-white font-titre-grey">
      <div
        className={
          status == "done"
            ? "hidden"
            : "absolute top-[30px] right-[35px] z-[5] flex gap-[7px] "
        }
      >
        <div className={userRole == "recruiter" ? "hidden" : ""}>
          <Button variant="outlined" onClick={handleClick}>
            Create new task
          </Button>
        </div>
        <div className={status == "onHold" ? "hidden" : ""}>
          <Button variant="outlined" onClick={handleClickOpenList}>
            check tasks
          </Button>
        </div>
        <div className={status != "onHold" ? "hidden" : ""}>
          <Button variant="outlined" onClick={handleNavigation}>
            Share project
          </Button>
        </div>

        <Dialog
          open={openD}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClick}
          aria-describedby="alert-dialog-slide-description"
        >
          <CreateTask onTaskCreate={handleTaskCreate} projectId={projectId} />
        </Dialog>
        <Dialog
          open={openL}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseList}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              scrollbarWidth: "none", // Firefox
              WebkitOverflowScrolling: "touch", // iOS momentum scrolling
              "&::WebkitScrollbar": {
                display: "none", // Hide scrollbar for Chrome, Safari, etc.
              },
            },
          }}
        >
          <div className="p-[40px]  flex flex-col items-start justify-start gap-[10px]">
            {/* zedt ka3bet 3al manther */}
            {tasks.map((task) => (
              <div className=" relative flex flex-row items-start justify-start z-[0]">
                <div className="w-5  rounded-tl-[7.48px] rounded-tr-none rounded-br-none rounded-bl-[7.48px] bg-orange h-[50px]" />
                <div className="sm:w-[431px] w-[281px]  shadow-[3px_3px_17.58px_rgba(0,_0,_0,_0.09)] bg-white h-[50px]" />

                <div className="!m-[0] absolute top-[4px] left-[40px] flex flex-row items-center justify-start gap-[247px] z-[1]">
                  <div className="sm:w-[107px] w-[57px] flex flex-col items-start justify-start">
                    <div className="sm:w-[220px] w-[220px]  leading-[113%] font-semibold flex items-center h-[23px] shrink-0">
                      {task.title}
                    </div>
                    <div className="sm:w-[215px] w-[210px]  text-2xs tracking-[-0.01em] leading-[145.45%] font-light text-gray-1600 text-justify flex items-center h-4 shrink-0">
                      {task.description}{" "}
                    </div>
                  </div>
                </div>
                <div className="absolute top-[30%] right-[5%]  flex justify-center items-center gap-[10px] ">
                  <input
                    className={userRole == "recruiter" ? "hidden" : ""}
                    type="button"
                    value={task.isDone ? "Mark As inProgress" : "Mark As Done"}
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        task.title,
                        task.description,
                        task.freelancerId,
                        task.projectId,
                        !task.isDone
                      )
                    }
                  />
                  {task.isDone ? (
                    <DoneIcon></DoneIcon>
                  ) : (
                    <CloseIcon></CloseIcon>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Dialog>
      </div>

      <img
        className="w-[451px] relative rounded-sm h-[177px] opacity-[0.79]"
        alt=""
        src="/rectangle-31845.svg"
      />

      <div className="!m-[0] absolute top-[11px] left-[28px] flex flex-col items-start justify-start gap-[14px] z-[1]">
        <div className="w-[407px] flex flex-col items-start justify-start relative gap-[10px] text-3xs">
          <div className="flex flex-row items-start justify-start gap-[12px] z-[0]">
            <div className="flex flex-row items-start justify-start">
              <img
                className="w-[29.4px] relative h-[29.4px] object-cover cursor-pointer ml-[-13px]"
                alt=""
                src="/mask-group-12@2x.png"
              />
            </div>
          </div>
        </div>
        <div className="w-[156px] h-[39px] flex flex-col items-start justify-start p-2.5 box-border  gap-[10px] text-left text-blue">
          <div className="w-[256px]  text-base leading-[113%] font-semibold flex items-center h-5 shrink-0 z-[1]">
            {title}
          </div>
          <div className="w-[236px] tracking-[-0.01em] leading-[145.45%] font-light  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text]  flex items-center h-[15px] shrink-0 z-[0]">
            {description}
          </div>
          <div className="w-[236px] tracking-[-0.01em] leading-[145.45%] font-light  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text]  flex items-center h-[15px] shrink-0 z-[0]">
            Total Price : {totalPrice} DT
          </div>
        </div>
        <div className="flex flex-col mt-[20px] items-start justify-start gap-[3px] text-b">
          <div className="w-[97px] ml-[11px]  tracking-[-0.01em] leading-[145.45%] font-light text-blue whitespace-pre-wrap flex items-center h-6 shrink-0">
            {Math.round((doneTasks * 100) / tasks.length) + "% done"}
          </div>
          <div className="w-[393px] relative h-[8.8px]">
            <div className="absolute top-[0px] left-[0px] rounded-[5.98px] bg-lightskyblue-100 w-[393px] h-[8.8px]" />
            <div className="absolute top-[0px] left-[0px] rounded-[5.98px] bg-white w-[215.8px] h-[8.8px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnDirection3;
