import { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";
import { Button } from "@mui/material";
import { send } from "../utilFunctions/sendData";

export default function CreateTask({ onTaskCreate, projectId }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const navigating = () => {};

  async function apply() {
    setIsApplyClicked(true);
    if (taskTitle && taskDescription) {
      const taskId = await send(
        false,
        {
          title: taskTitle,
          description: taskDescription,
          projectId,
          freelancerId: 3,
        },
        navigating,
        "http://localhost:3001/api/toDoList/"
      );
      onTaskCreate(taskId, taskTitle, taskDescription, 3, projectId, false);
      setTaskTitle("");
      setDescription("");
      setIsApplyClicked(false);
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center ">
      <div className=" mb-[-35px] tracking-[0.02em]  leading-[131%] font-extrabold !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block h-[89px] shrink-0">
        <p className="m-0">Create New Task To Do</p>
      </div>
      <div className="mb-[30px]">
        <FormInput
          placeHolder="Task Title"
          type="text"
          value={taskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTaskTitle(e.target.value)
          }
          message={taskTitle == "" ? "Task title is required" : ""}
          errorStatus={taskTitle == "" && isApplyClicked}
          textArea={false}
        />
      </div>
      <div className="mb-[30px]">
        <FormInput
          placeHolder="Task Description"
          type="text"
          value={taskDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          message={taskDescription == "" ? "Task description is required" : ""}
          errorStatus={taskDescription == "" && isApplyClicked}
          textArea={false}
        />
      </div>
      <div className="flex justify-center ">
        <Button
          className="h-[79px] flex-1 relative min-w-[127px] mq450:flex-1 "
          disableElevation={true}
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#ff4f4c",
            fontSize: "28",
            background: "#fff",
            borderRadius: "6px",
            "&:hover": { background: "#fff" },
            height: 79,
            width: "150px",
          }}
          onClick={apply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
