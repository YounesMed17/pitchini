import { ChangeEvent, FunctionComponent } from "react";
import { MenuItem, Select } from "@mui/material";
import FormInput from "./FormInput";
import { validateNotEmpty } from "../utilFunctions/ValidateFunction";

interface StepOneContentProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  domain: string[];
  domainAndSkills: any[];
  handleDomainChange: (event: any) => void;
  isNextClicked: boolean;
}

const StepOneFormPostProject: FunctionComponent<StepOneContentProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  domain,
  domainAndSkills,
  handleDomainChange,
  isNextClicked,
}) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[11px] max-w-full">
      <div className="self-stretch h-[30px] relative text-base uppercase font-medium text-blue text-left inline-block shrink-0 mb-[5px]">
        <p className="m-0" style={{ color: "#6495ED" }}>
          Give your project brief a title
        </p>
      </div>
      <FormInput
        placeHolder="Example: Create a WordPress website for my company"
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setTitle(e.target.value)
        }
        message="Title is required"
        errorStatus={
          isNextClicked ? (validateNotEmpty(title) ? false : true) : false
        }
        textArea={false}
      />
      <div className="self-stretch h-[30px] relative text-base uppercase font-medium text-blue text-left inline-block shrink-0 mt-[15px] mb-[5px]">
        <p className="m-0" style={{ color: "#6495ED" }}>
          Describe your project
        </p>
      </div>
      <FormInput
        placeHolder="..."
        type="text"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        message="Description is required"
        errorStatus={
          isNextClicked ? (validateNotEmpty(description) ? false : true) : false
        }
        textArea={true}
      />

      <div className="self-stretch h-[30px] relative text-base uppercase font-medium text-blue text-left inline-block shrink-0 mt-[15px] mb-[5px]">
        <p className="m-0" style={{ color: "#6495ED" }}>
          Which category best fits your project?
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
        sx={{
          fontSize: "14px",
          height: "35px",
          "& .MuiSelect-select": {
            padding: "8px",
          },
        }}
      >
        {domainAndSkills.map((val, index) => (
          <MenuItem key={index} value={val.domaine} sx={{ fontSize: "14px" }}>
            {val.domaine}
          </MenuItem>
        ))}
      </Select>
      <div className={domain.length !== 0 || !isNextClicked ? "hidden" : ""}>
        <p className="mt-[-5px] text-red-500 text-[12px]">
          You need to select 1 category at least
        </p>
      </div>
    </div>
  );
};

export default StepOneFormPostProject;
