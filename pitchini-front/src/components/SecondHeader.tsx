import { Button } from "@mui/material";

function SecondHeader(props: {
  path: string;
  title2: string;
  title1: string;
  showButtons: boolean;
}) {
  const { path, title2, title1, showButtons } = props;
  const buttonClass =
    "self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full";
  return (
    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[49px] pl-[51px] box-border max-w-full shrink-0 text-center mq1050:pl-[25px] mq1050:pr-6 mq1050:box-border">
      <div className="flex-1 flex flex-col items-start justify-start gap-[8.400000000001455px] max-w-full">
        <h1 className="m-0 self-stretch relative text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000] z-[1] mq1000:text-31xl mq450:text-19xl">
          {title1}
        </h1>
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-[30px] box-border max-w-full text-6xl">
          <div className="flex-1 flex flex-col items-start justify-start gap-[59px] max-w-full mq450:gap-[29px_59px]">
            <div className="self-stretch relative leading-[37px] font-medium mq450:text-xl mq450:leading-[29px]">
              {title2}
            </div>
            <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
              <img
                className="w-[545px] relative max-h-full object-cover max-w-full"
                loading="lazy"
                alt=""
                src={path}
              />
            </div>

            <div className={showButtons ? buttonClass : "hidden"}>
              <div className="w-[595px] flex flex-row items-start justify-center gap-[9px] max-w-full mq725:flex-wrap">
                <Button
                  className="h-[79px] flex-[0.4573] min-w-[190px] mq725:flex-1"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#2f80ed",
                    fontSize: "28",
                    background: "#fff",
                    borderRadius: "6px",
                    "&:hover": { background: "#fff" },
                    height: 79,
                  }}
                >
                  Freelancer
                </Button>
                <Button
                  className="h-[79px] flex-1 relative min-w-[190px] mq725:flex-1"
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#c4c4c4",
                    fontSize: "28",
                    background: "#fff",
                    borderRadius: "6px",
                    "&:hover": { background: "#fff" },
                    height: 79,
                  }}
                >
                  Recruiter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SecondHeader;
