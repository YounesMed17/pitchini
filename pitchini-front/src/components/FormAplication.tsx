import { FunctionComponent, useCallback, useState } from "react";
import FormInput from "./FormInput";
import { Button } from "@mui/material";
import { send } from "../utilFunctions/sendData";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const EnTete: FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const userId = 3;
  const projectId = 58;

  const navigate = useNavigate();
  const navigating = useCallback(() => {
    navigate("/signupinterview", {
      state: {},
    });
  }, [navigate]);
  async function apply() {
    const freelancerId = 1;
    const ligneId = await send(
      false,
      { userId: freelancerId, projectId, description, deadline: selectedDate },
      navigating,
      "http://localhost:3001/api/projectApplicants/"
    );
    if (ligneId != null) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileFormData = {
          link: "imagesServerURL",
          type: "cv/portfolio",
          userId: ligneId, // application id
          file: selectedFiles[i],
        };
        console.log(fileFormData);
        send(false, fileFormData, navigating, "http://localhost:3001/api/file");
      }

      const ligneId2 = await send(
        false,
        {
          message: "A freelancer applied for your job",
          type: "Project update",
          userId, //client who posted the project
          freelancerId: 1, // freelancer who applied for the project
        },
        navigating,
        "http://localhost:3001/api/notification/"
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      // Upload the files or perform any other actions
    }
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue = event.target.value;
    setSelectedDate(selectedDateValue);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      setSelectedFiles([...selectedFiles, ...Array.from(droppedFiles)]);
      // Upload the dropped files or perform any other actions
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white px-8 pt-6 pb-8 mb-4">
      <h4>explain how you will be perfect for the job</h4>
      <FormInput
        placeHolder="..."
        type="text"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        message="Description is required"
        errorStatus={false}
        textArea={true}
      />
      <div
        className="mt-[27px] self-stretch rounded-sm bg-silver-200 box-border flex flex-col items-center justify-start py-[30px] px-5 gap-[12px] max-w-full border-[2px] border-solid border-blue-1"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="fileInput">
          <img
            className="h-[104px] w-[152px] pr-[240px] pl-[240px] relative object-cover cursor-pointer "
            loading="lazy"
            alt="Upload file"
            src="/icon0101-1@2x.png"
          />
        </label>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <h2 className="m-0 w-[601px] relative text-inherit font-medium font-inherit inline-block max-w-full mq1050:text-7xl mq450:text-lgi flex justify-center items-center">
          <p className="m-0">Drag and drop file here or choose file</p>
        </h2>
        <div className={selectedFiles.length == 0 ? "hidden" : " mt-[22px]"}>
          <p className="mt-[-18px] text-blue-500 text-[21px]">
            A file has been added
          </p>
        </div>
      </div>

      <div className="mt-8 relative mb-[20px]">
        <h4>Pick a deadLine date</h4>
        <input
          type="date"
          className="block w-[200px] p-3 rounded-lg border-3 border-gray-300 shadow-lg"
          value={selectedDate}
          onChange={handleDateChange}
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
          }}
          onClick={apply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default EnTete;
