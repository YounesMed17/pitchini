import { ChangeEvent } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  setErrorMessage: (error: string) => void;
  number: number;
  setNumber: (number: number) => void;
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
}

function InputComponent({
  type,
  placeholder,
  value,
  handleInputChange,
  errorMessage,
  hasError,
  setHasError,
}: InputProps) {
  return (
    <div className="self-stretch h-[59px] w-[700px] relative flex flex-col justify-center items-center space-y-2">
      <div
        className={`absolute top-0 left-0 rounded-sm bg-silver box-border w-full h-full border-2 border-solid pl-10 ${
          hasError ? "border-red-500" : "border-grey"
        }`}
      />

      <input
        className="w-[calc(100% - 18px)] border-none outline-none font-medium font-titre-grey text-[18px] bg-transparent absolute top-5 left-px text-black text-left inline-block h-79px p-0 z-1 text-14xl-2 ml-10 "
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleInputChange}
        onBlur={() => setHasError(false)}
      />
      {hasError && errorMessage !== "Email and password are required" && (
        <div className="absolute bottom-[-30px] left-0 text-red-500 text-sm pl-10 text-[30px] pt-10 pb-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default InputComponent;
