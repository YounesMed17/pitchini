import { FunctionComponent } from "react";

const PortfolioProjects: FunctionComponent = () => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[85px] shrink-0 [debug_commit:1de1738] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey lg:gap-[42px] mq750:gap-[21px]">
      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="w-[800px] flex flex-col items-start justify-start gap-[29.5px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <div className="w-[550px] flex flex-col items-start justify-start gap-[36.8px] max-w-full mq750:gap-[18px]">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="w-[212px] relative leading-[22px] uppercase font-medium inline-block shrink-0">
                  PORTFOLIO
                </div>
              </div>
              <h1 className="m-0 self-stretch h-[1.7px] relative text-21xl leading-[112.94%] font-semibold font-inherit text-orange inline-block shrink-0 [text-shadow:1px_0_0_rgba(0,_0,_0,_0),_0_1px_0_rgba(0,_0,_0,_0),_-1px_0_0_rgba(0,_0,_0,_0),_0_-1px_0_rgba(0,_0,_0,_0)] mq450:text-5xl mq450:leading-[27px] mq1050:text-13xl mq1050:leading-[36px]">
                Check My Wonderful Work
              </h1>
            </div>
          </div>
          <div className="self-stretch relative text-sm leading-[21px] text-grey2 z-[1]">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo orci odio, ut bus sed. `}</div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[41px] max-w-full text-lg text-gray-100 mq750:gap-[20px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[564px] relative leading-[27px] uppercase inline-block shrink-0 opacity-[0.53] max-w-full">
            <span className="font-semibold">all</span>
            <span className="font-medium text-grey2 whitespace-pre-wrap">
              {" "}
              webdesign app design seo
            </span>
          </div>
        </div>
        <div className="self-stretch grid flex-row items-start justify-start gap-[15px] grid-cols-[repeat(4,_minmax(207px,_1fr))] mq450:grid-cols-[minmax(207px,_1fr)] mq1050:justify-center mq1050:grid-cols-[repeat(2,_minmax(207px,_359px))]">
          <div className="h-[918.1px] flex flex-col items-start justify-start gap-[14px]">
            <img
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-13@2x.png"
            />
            <img
              className="self-stretch h-[418.6px] relative max-w-full overflow-hidden shrink-0 object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-22@2x.png"
            />
          </div>
          <div className="h-[918.1px] flex flex-col items-start justify-start gap-[14px]">
            <img
              className="self-stretch h-[418.6px] relative max-w-full overflow-hidden shrink-0 object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-32@2x.png"
            />
            <img
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-42@2x.png"
            />
          </div>
          <div className="h-[918.1px] flex flex-col items-start justify-start gap-[14px]">
            <img
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-51@2x.png"
            />
            <img
              className="self-stretch h-[418.6px] relative max-w-full overflow-hidden shrink-0 object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-61@2x.png"
            />
          </div>
          <div className="h-[918.1px] flex flex-col items-start justify-start gap-[14px]">
            <img
              className="self-stretch h-[418.6px] relative max-w-full overflow-hidden shrink-0 object-cover"
              loading="lazy"
              alt=""
              src="/mask-group-71@2x.png"
            />
            <img
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-contain"
              loading="lazy"
              alt=""
              src="/mask-group-81@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjects;
