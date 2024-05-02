import { Button } from "@mui/material";
import { FunctionComponent } from "react";

interface PortfolioHeaderProps {
  nickname: string;
  jobTitle: string;
}

const PortfolioHeader: FunctionComponent<PortfolioHeaderProps> = ({
  nickname,
  jobTitle,
}) => {
  return (
    <div className=" flex flex-col md:flex-row justify-center md:gap-[27%]  gap-[0px] items-center mt-[25px]  self-stretch bg-[#F1F1F1] pt-[70px]  pb-[80.7px]  z-[1] text-left text-10xl-1 text-dimgray-1000 font-titre-grey mq450:gap-[23px] mq450:pt-[77px] mq450:px-5 mq450:pb-[103px] mq450:box-border mq1050:pt-[119px] mq1050:px-[85px] mq1050:pb-[158px] mq1050:box-border">
      <div>
        <div className="w-[283px] flex flex-col md:items-start md:justify-start justify-center items-center  gap-[9px]">
          <div className="w-[183.3px]  leading-[45.1px] font-medium inline-block z-[2] mq450:text-4xl mq450:leading-[34px]">
            Hello, I’m
          </div>
          <h1 className="m-0 self-stretch   text-21xl font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-shadow:0.7px_0_0_rgba(0,_0,_0,_0),_0_0.7px_0_rgba(0,_0,_0,_0),_-0.7px_0_0_rgba(0,_0,_0,_0),_0_-0.7px_0_rgba(0,_0,_0,_0)] z-[2] mq450:text-5xl mq1050:text-13xl">
            {nickname}
          </h1>
          <div className="w-[218px]  text-xl leading-[31px] uppercase text-darkslategray-200 inline-block z-[2] mq450:text-base mq450:leading-[23px]">
            {jobTitle}
          </div>
          <div className="mt-[40px] flex flex-row flex-wrap  gap-[13px] max-w-full text-center text-mini-6 text-dimgray-200 font-montserrat">
            <Button
              className=" w-[146.2px]  shrink-0 [debug_commit:1de1738] z-[2]"
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "14.6",
                background: "linear-gradient(99.26deg, )",
                borderRadius: "4px 4px 4px 4px",
                "&:hover": { background: "linear-gradient(99.26deg, )" },
                width: 146.2,
                height: 66.2,
              }}
            >
              Portfolio
            </Button>
          </div>
        </div>
      </div>

      <div>
        <img
          className=" md:w-[250px] w-[150px] md:mt-[0] mt-[30px]"
          alt=""
          src="/avatargirl.webp"
        />
      </div>
    </div>
  );
};

export default PortfolioHeader;
