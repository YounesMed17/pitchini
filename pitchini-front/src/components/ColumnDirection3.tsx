import { useEffect, useState } from "react";
import { Button, Dialog, Slide } from "@mui/material";
import CreateTask from "./CreateTask";
import { get } from "../utilFunctions/getData";
import { set } from "date-fns";

const Transition = Slide;

const ColumnDirection3 = ({
  id,
  title,
  description,
  totalPrice,
  projectId,
  status,
  onNewTask,
  userRole,
}) => {
  const [openD, setOpenD] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await get(
        `http://localhost:3001/api/toDoList/allProjectTasks/${id}`
      );
      const values = await res;

      const tasks = values.map((item) => ({
        title: item.title,
        isDone: item.isDone,
      }));

      setTasks(tasks);
    }

    fetchData();
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

  return (
    <div className="mb-[25px] flex flex-col items-start justify-start relative gap-[10px] text-justify text-2xs text-white font-titre-grey">
      <div
        className={
            status == "done" || userRole == "recruiter"
              ? "hidden"
            : "absolute top-[30px] right-[35px] z-[5]"
        }
      >
        <Button variant="outlined" onClick={handleClick}>
          Create new task
        </Button>
        <Dialog
          open={openD}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClick}
          aria-describedby="alert-dialog-slide-description"
        >
          <CreateTask onTaskCreate={handleTaskCreate} projectId={projectId} />
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
