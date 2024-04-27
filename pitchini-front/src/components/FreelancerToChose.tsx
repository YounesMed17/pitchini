import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import ArcsArchway from "./ArcsArchway";

const FreelancerToChose: FunctionComponent = () => {
  return (
    <div className=" mb-[30px] mt-[30px]  self-stretch flex flex-row items-start justify-between py-0 pr-0 pl-[22px] box-border max-w-full gap-[20px] text-left text-sm text-dimgray-900 font-titre-grey mq1050:flex-wrap">
      <div className="w-[717px] flex flex-row items-start justify-start gap-[30px] max-w-full mq750:flex-wrap">
        <img
          className="h-[91px] w-[91px] relative object-contain"
          loading="lazy"
          alt=""
          src="/FreelancerAvatar.png"
        />
        <div className="flex-1 flex flex-col items-start justify-start gap-[10px] min-w-[387px] max-w-full mq750:min-w-full">
          <div className="flex flex-col items-start justify-start text-mini">
            <div className="flex flex-col items-start justify-start">
              <div className="h-7 relative leading-[113%] font-semibold text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center shrink-0 min-w-[76px]">
                Allison H.
              </div>
              <div className="relative text-xs tracking-[-0.01em] leading-[145.45%] font-light inline-block min-w-[56.2px] whitespace-nowrap z-[1] mt-[-5px]">
                <span className="uppercase">é</span>
                <span className="lowercase">TATS-</span>
                <span className="uppercase">U</span>
                <span className="lowercase">NIS</span>
              </div>
            </div>
            <div className="h-8 relative text-xs tracking-[-0.01em] leading-[145.45%] uppercase font-medium text-dimgray-800 text-justify flex items-center shrink-0 z-[2]">
              Graphiste expert et stratège de marque
            </div>
          </div>
          <div className="w-[433px] h-[31px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center shrink-0 max-w-full">
            Price per hour : $25-$50 | Profil : Expert | Number of projects : 15
          </div>
          <div className="w-[433px] flex flex-row items-start justify-start gap-[6px] max-w-full text-center text-xs text-darkgray-500 font-montserrat mq450:flex-wrap">
            <div className="flex-1 flex flex-row items-start justify-start py-[9.7px] px-[7.7px] box-border relative min-w-[78px] z-[1]">
              <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-7xs bg-silver-300" />
              <div className="h-[25.6px] flex-1 relative tracking-[-0.01em] capitalize font-medium flex items-center z-[1]">
                <span>
                  <p className="m-0">Conception de</p>
                  <p className="m-0">dépliants</p>
                </span>
              </div>
            </div>
            <div className="flex-[0.7713] flex flex-row items-start justify-start pt-[11.5px] pb-[10.6px] pr-[19.7px] pl-[20.6px] box-border relative min-w-[81px] z-[1] mq450:flex-1">
              <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-7xs bg-silver-300" />
              <div className="flex-1 relative tracking-[-0.01em] capitalize font-medium z-[1]">
                <p className="m-0">Conception</p>
                <p className="m-0">graphique</p>
              </div>
            </div>
            <button className="cursor-pointer [border:none] pt-[8.8px] pb-2 pr-[14.6px] pl-[15.4px] bg-[transparent] w-[97.7px] flex flex-row items-start justify-start box-border relative">
              <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-7xs bg-silver-300" />
              <div className="flex-1 relative text-xs tracking-[-0.01em] capitalize font-medium font-montserrat text-darkgray-500 text-center z-[1]">
                Création de logo
              </div>
            </button>
            <Button
              className="h-[45px] w-[72.9px]"
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#a6a5a5",
                fontSize: "12",
                background: "rgba(196, 196, 196, 0.41)",
                borderRadius: "0px 0px 0px 0px",
                "&:hover": { background: "rgba(196, 196, 196, 0.41)" },
                width: 72.9,
                height: 45,
              }}
            >
              +10
            </Button>
          </div>
          <div className="self-stretch h-12 relative tracking-[-0.01em] leading-[145.45%] font-light text-gray-600 text-justify flex items-center shrink-0 z-[1]">
            Plus de 12 ans d'expérience dans la création de marques grâce à la
            conception stratégique Lorsque vous travaillez avec moi, vous
            travaillez avec quelqu'un...
          </div>
        </div>
      </div>
      <ArcsArchway />
    </div>
  );
};

export default FreelancerToChose;
