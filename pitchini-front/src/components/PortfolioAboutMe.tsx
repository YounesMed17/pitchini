import { FunctionComponent } from "react";

interface PortfolioAboutMeProps {
  bio: string;
  description: string;
}

const PortfolioAboutMe: FunctionComponent<PortfolioAboutMeProps> = ({
  bio,
  description,
}) => {
  return (
    <div className="w-full mt-[60px] mb-[50px] flex flex-col items-center justify-center gap-[82px] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey mq1050:gap-[41px] mq750:gap-[20px]">
      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="w-[834px] flex flex-col items-start justify-start gap-[14px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <div className="w-[211px] flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-[21px]">
                <div className="flex-1 relative leading-[22px] uppercase font-medium">
                  Who am i
                </div>
              </div>
              <h1 className="m-0 self-stretch h-[49px] relative text-21xl font-semibold font-inherit text-orange inline-block shrink-0 [text-shadow:0.7px_0_0_rgba(0,_0,_0,_0),_0_0.7px_0_rgba(0,_0,_0,_0),_-0.7px_0_0_rgba(0,_0,_0,_0),_0_-0.7px_0_rgba(0,_0,_0,_0)] z-[1] mq450:text-5xl mq1050:text-13xl">
                About Me
              </h1>
            </div>
          </div>
          <div className="self-stretch relative text-sm leading-[22px] text-grey2">
            {bio}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div>
          <img
            className=" md:w-[200px] w-[150px] md:mt-[0] mt-[30px]"
            alt=""
            src="/avatargirl.webp"
          />
        </div>
        <div className="md:w-[800px] ml-[60px] w-[350px] text-lg-2 leading-[146%] text-darkgray-1100 text-justify">
          <p className="">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAboutMe;
