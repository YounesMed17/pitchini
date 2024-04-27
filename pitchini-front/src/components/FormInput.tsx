import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { TextField } from "@mui/material";

function FormInput(props: {
  placeHolder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  errorStatus: boolean;
  message: string;
  textArea: boolean;
}) {
  const { placeHolder, type, onChange, value, errorStatus, message, textArea } =
    props;

  return (
    <>
      {textArea ? (
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          style={{
            border: "1px solid #c4c4c4",
            backgroundColor: "transparent",
            height: "185px",
            fontSize: "21px",
            borderRadius: "14px",
            padding: "16px",
            resize: "none",
            width: "100%",
            boxSizing: "border-box",
            color: "#999999",
          }}
        />
      ) : (
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-[85px] font-join-text font-medium text-darkgray"
          placeholder={placeHolder}
          onChange={onChange}
          variant="outlined"
          type={type}
          value={value}
          sx={{
            "& fieldset": { borderColor: "#c4c4c4" },
            "& .MuiInputBase-root": {
              height: "65px",
              borderRadius: "14px",
              fontSize: "21px",
            },
            "& .MuiInputBase-input": { color: "#a09d9d" },
          }}
        />
      )}
      <div className={!errorStatus ? "hidden" : ""}>
        <p className="mt-[-17px] text-red-500 text-[16px]">{message}</p>
      </div>
    </>
  );
}

export default FormInput;
