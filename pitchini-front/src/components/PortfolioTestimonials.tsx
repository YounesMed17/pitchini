import { FunctionComponent } from "react";

const PortfolioTestimonials: FunctionComponent = () => {
  return (
    <div className="bg-[#f2f2f2] mb-[70px] w-full pt-[30px] pb-[140px] flex flex-col items-start justify-start gap-[89px] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey lg:gap-[44px] mq750:gap-[22px]">
      <div className="self-stretch relative flex flex-col items-start justify-start gap-[43px] max-w-full mq750:gap-[21px]">
        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <div className="flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="  leading-[22px] uppercase font-medium inline-block shrink-0">
                  TESTIMONIALS
                </div>
              </div>
              <h1 className="m-0 self-stretch relative md:text-21xl text-[20px] font-semibold font-inherit text-orange [text-shadow:1px_0_0_rgba(0,_0,_0,_0),_0_1px_0_rgba(0,_0,_0,_0),_-1px_0_0_rgba(0,_0,_0,_0),_0_-1px_0_rgba(0,_0,_0,_0)] z-[1] mt-[-2px] ">
                What People Say About Me
              </h1>
            </div>
          </div>
          <div className="mt-[25px] self-stretch h-7  md:text-sm text-[14px] ml-[70px] mr-[70px] leading-[146%] text-grey2 inline-block shrink-0 mt-[-5.9px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            commodo orci odio, ut bus sed.
          </div>
        </div>
        <img
          className=" md:w-[150px] w-[100px]  absolute md:left-[44.2%] left-[40%] md:top-[110%] top-[150%] z-[10]"
          alt=""
          src="/avatargirl.webp"
        />
      </div>
    </div>
  );
};

export default PortfolioTestimonials;
