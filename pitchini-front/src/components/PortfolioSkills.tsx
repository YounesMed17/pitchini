import { FunctionComponent } from "react";
import ProgressBar from "./ProgressBar";

interface portfolioSkillsProps {
  skills: { skills: string }[];
}

const PortfolioSkills: FunctionComponent<portfolioSkillsProps> = ({
  skills,
}) => {
  return (
    <div className="mb-[70px] flex flex-col items-start justify-start gap-[89px] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey lg:gap-[44px] mq750:gap-[22px]">
      <div className="self-stretch flex flex-col items-start justify-start gap-[43px] max-w-full mq750:gap-[21px]">
        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <div className=" flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="w-[229px] relative leading-[22px] uppercase font-medium inline-block shrink-0">
                  SKILLS
                </div>
              </div>
              <h1 className="m-0 self-stretch relative md:text-21xl text-[20px] font-semibold font-inherit text-orange [text-shadow:1px_0_0_rgba(0,_0,_0,_0),_0_1px_0_rgba(0,_0,_0,_0),_-1px_0_0_rgba(0,_0,_0,_0),_0_-1px_0_rgba(0,_0,_0,_0)] z-[1] mt-[-2px] ">
                Why Choose Me
              </h1>
            </div>
          </div>
          <div className="mt-[25px] self-stretch h-7  md:text-sm text-[14px] ml-[70px] mr-[70px] leading-[146%] text-grey2 inline-block shrink-0 mt-[-5.9px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            commodo orci odio, ut bus sed.
          </div>
          <div className="container flex justify-center items-center mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((item, index) => (
                <ProgressBar key={index} value={74} label={item.skills} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSkills;
