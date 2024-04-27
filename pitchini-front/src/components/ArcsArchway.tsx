import { FunctionComponent } from "react";
import { Button } from "@mui/material";

const ArcsArchway: FunctionComponent = () => {
  return (
    <div className="w-28 flex flex-col items-start justify-start gap-[4px] text-left text-xs text-blue-1 font-titre-grey">
      <Button
        className="self-stretch h-[38px] shadow-[4px_4px_23.5px_rgba(0,_0,_0,_0.09)]"
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "14",
          background: "#2f80ed",
          borderRadius: "10px",
          "&:hover": { background: "#2f80ed" },
          height: 38,
        }}
      >
        View Profile
      </Button>
      <div className="flex flex-row items-start justify-start py-0 pr-px pl-[1.5px]">
        <div className="flex flex-row items-start justify-start gap-[7px]">
          <img
            className="h-6 w-[21px] relative object-cover min-h-[24px]"
            loading="lazy"
            alt=""
            src="/160002-1@2x.png"
          />
          <div className="h-6 relative leading-[113%] flex items-center min-w-[81px]">
            Interview Call
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcsArchway;
