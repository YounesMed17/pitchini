import { FunctionComponent } from "react";

const PortfolioStatistics: FunctionComponent = ({ projectCount }) => {
  return (
    <div className="flex justify-center items-center ">
      <div className="rounded-[10px]  self-stretch bg-[#000] z-[5] flex items-center justify-center py-0 pr-5 pl-[21px] box-border w-fit  mt-[-40px] text-center text-4xl-3 text-white font-titre-grey">
        <div className="w-fit  flex flex-row items-center justify-center pt-[10.9px] pb-[11.5px] pr-[23px] pl-[22.6px] box-border relative gap-[20px] max-w-full mq750:flex-wrap">
          <div className="bg-[#000] flex flex-col items-center justify-center gap-[4px]">
            <div className="self-stretch flex flex-row items-center justify-center py-0 pr-7 pl-[27.7px]">
              <div className=" flex-1 relative leading-[35px] uppercase font-semibold z-[3] mq450:text-lgi mq450:leading-[27px]">
                234
              </div>
            </div>
            <div className="self-stretch relative text-smi-4 leading-[20.8px] uppercase font-light z-[3]">
              Happy Clients
            </div>
          </div>
          <div className="bg-[#000] flex flex-col items-center justify-center gap-[4px]">
            <div className="self-stretch flex flex-row items-center justify-center py-0 pr-7 pl-[27.7px]">
              <div className=" flex-1 relative leading-[35px] uppercase font-semibold z-[3] mq450:text-lgi mq450:leading-[27px]">
                ⭐⭐⭐
              </div>
            </div>
            <div className="self-stretch relative text-smi-4 leading-[20.8px] uppercase font-light z-[3]">
              Average Rate
            </div>
          </div>
          <div className="bg-[#000] flex flex-col items-center justify-center gap-[4px]">
            <div className="self-stretch flex flex-row items-center justify-center py-0 pr-7 pl-[27.7px]">
              <div className=" flex-1 relative leading-[35px] uppercase font-semibold z-[3] mq450:text-lgi mq450:leading-[27px]">
                {projectCount}
              </div>
            </div>
            <div className="  self-stretch relative text-smi-4 leading-[20.8px] uppercase font-light z-[3]">
              Projects Done
            </div>
          </div>
          <div className="h-[80%] w-[1.5px] absolute  left-[142.4px] box-border z-[3] border-r-[1.5px] border-solid border-white" />
          <div className="h-[80%] w-[1.5px] absolute  right-[155.4px] box-border z-[3] border-r-[1.5px] border-solid border-white" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioStatistics;
