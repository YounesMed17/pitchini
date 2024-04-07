import { ChangeEvent, FunctionComponent, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import FormInput from "./FormInput";
import { validateNotEmpty } from "../utilFunctions/ValidateFunction";

interface StepOneContentProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  domain: string[];
  domainAndSkills: any[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDomainChange: (event: any) => void;
  isNextClicked: boolean;
  selectedValue: string;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StepOneFormPostProject: FunctionComponent<StepOneContentProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedFiles,
  domain,
  domainAndSkills,
  handleFileChange,
  handleDragOver,
  handleDrop,
  handleDomainChange,
  isNextClicked,
  selectedValue,
  handleRadioChange,
}) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[11px] max-w-full">
      <div className="self-stretch h-[53px] relative text-6xl uppercase font-medium text-blue text-left inline-block shrink-0 mq1050:text-7xl mq450:text-lgi mb-[-10px]">
        <p className="m-0 " style={{ color: "#6495ED" }}>
          Give your project brief a title
        </p>
      </div>
      <FormInput
        placeHolder="Exemple: Create a WordPress website for my company"
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        message="Title is required"
        errorStatus={
          isNextClicked ? (validateNotEmpty(title) ? false : true) : false
        }
        textArea={false}
      />
      <div className="self-stretch h-[53px] relative text-6xl uppercase font-medium text-blue text-left inline-block shrink-0 mq1050:text-7xl mq450:text-lgi mt-[24px] mb-[-10px]">
        <p className="m-0 " style={{ color: "#6495ED" }}>
          Describe your project
        </p>
      </div>
      <FormInput
        placeHolder="Exemple: Create a WordPress website for my company"
        type="text"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        message="Description is required"
        errorStatus={
          isNextClicked ? (validateNotEmpty(description) ? false : true) : false
        }
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
      <div className="self-stretch h-[53px] relative text-6xl uppercase font-medium text-blue text-left inline-block shrink-0 mq1050:text-7xl mq450:text-lgi mt-[24px] mb-[-10px]">
        <p className="m-0 " style={{ color: "#6495ED" }}>
          Which category best fits your project ?
        </p>
      </div>
      <Select
        className="w-[50%]"
        labelId="select-label"
        id="select"
        value={domain}
        onChange={handleDomainChange}
        displayEmpty
        multiple
        renderValue={(selected) => (
          <div>
            {selected.length === 0
              ? "Select at least 1 category"
              : selected.join(", ")}
          </div>
        )}
      >
        {domainAndSkills.map((val, index) => (
          <MenuItem key={index} value={val.domaine}>
            {val.domaine}
          </MenuItem>
        ))}
      </Select>
      <div className={domain.length !== 0 || !isNextClicked ? "hidden" : ""}>
        <p className="mt-[-18px] text-red-500 text-[21px]">
          you need to select 1 category at least
        </p>
      </div>
      <FormControl component="fieldset">
        <Typography variant="h5" style={{ color: "#6495ED" }}>
          Do you prefer working with
        </Typography>
        <RadioGroup
          aria-label="type"
          name="type"
          value={selectedValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="group"
            control={<Radio />}
            label="Only a group"
          />
          <FormControlLabel
            value="prestataire"
            control={<Radio />}
            label="Only an individual"
          />
          <FormControlLabel
            value="any"
            control={<Radio />}
            label="No preference"
          />
        </RadioGroup>
      </FormControl>

      <div className={selectedValue || !isNextClicked ? "hidden" : ""}>
        <p className="mt-[-18px] text-red-500 text-[17px]">
          Please select an option
        </p>
      </div>
    </div>
  );
};

export default StepOneFormPostProject;
