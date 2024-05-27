import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { TextField } from "@mui/material";

function FormInput(props: {
  placeHolder: string;
  type: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
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
            height: "100px",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px",
            resize: "none",
            width: "100%",
            boxSizing: "border-box",
            color: "#999999",
          }}
        />
      ) : (
        <TextField
          className="bg-transparent self-stretch font-medium text-darkgray"
          placeholder={placeHolder}
          onChange={onChange}
          variant="outlined"
          type={type}
          value={value}
          sx={{
            "& fieldset": { borderColor: "#c4c4c4" },
            "& .MuiInputBase-root": {
              height: "50px",
              borderRadius: "8px",
              fontSize: "14px",
            },
            "& .MuiInputBase-input": { color: "#a09d9d" },
          }}
        />
      )}
      <div className={!errorStatus ? "hidden" : ""}>
        <p className="mt-[-10px] text-red-500 text-[12px]">{message}</p>
      </div>
    </>
  );
}

export default FormInput;
