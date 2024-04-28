import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import ArcsArchway from "./ArcsArchway";

interface FreelancerToChoseProps {
  nickname: string; // Define the type of the nickname prop (string)
}

const FreelancerToChose: FunctionComponent<FreelancerToChoseProps> = ({
  id,
  nickname,
  filteredUsersDomainSkills,
}) => {
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
                {nickname}
              </div>
            </div>
            <div className="h-8 relative text-xs tracking-[-0.01em] leading-[145.45%] uppercase font-medium text-dimgray-800 text-justify flex items-center shrink-0 z-[2]">
              Graphiste expert et stratège de marque
            </div>
          </div>
          <div className="w-[433px] h-[31px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center shrink-0 max-w-full">
            Price per hour : $25-$50 | Profil : Expert | Number of projects : 15
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="w-[433px] flex flex-row items-start justify-start items-center gap-[6px] max-w-full text-center text-xs text-darkgray-500 font-montserrat mq450:flex-wrap">
              <strong>
                <p>Skills:</p>
              </strong>
              {filteredUsersDomainSkills
                .filter((domainSkills) => domainSkills.userId === id)
                .map((domainSkill) => (
                  <button className="cursor-pointer [border:none] pt-[8.8px] pb-2 pr-[4.6px] pl-[15.4px] bg-[transparent] w-[45.7px] flex flex-row items-start justify-start box-border relative">
                    <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-7xs bg-silver-300" />
                    <div className="flex-1 relative text-xs tracking-[-0.01em] capitalize font-medium font-montserrat text-darkgray-500 text-center z-[1]">
                      {domainSkill.skill}
                    </div>
                  </button>
                ))}
            </div>
            <div className="w-[433px] flex flex-row items-start justify-start items-center gap-[6px] max-w-full text-center text-xs text-darkgray-500 font-montserrat mq450:flex-wrap">
              <strong>
                <p>Categories:</p>
              </strong>
              {filteredUsersDomainSkills
                .filter((domainSkills) => domainSkills.userId === id)
                .map((domainSkill) => (
                  <button className="cursor-pointer [border:none] pt-[8.8px] pb-2 pr-[4.6px] pl-[15.4px] bg-[transparent] w-[95.7px] flex flex-row items-start justify-start box-border relative">
                    <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-7xs bg-silver-300" />
                    <div className="flex-1 relative text-xs tracking-[-0.01em] capitalize font-medium font-montserrat text-darkgray-500 text-center z-[1]">
                      {domainSkill.domaine}
                    </div>
                  </button>
                ))}
            </div>
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
