import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

function FormInput(props: {
  placeHolder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  const { placeHolder, type, onChange, value } = props;
  return (
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
          height: "85px",
          borderRadius: "14px",
          fontSize: "26px",
        },
        "& .MuiInputBase-input": { color: "#a09d9d" },
      }}
    />
  );
}
export default FormInput;
