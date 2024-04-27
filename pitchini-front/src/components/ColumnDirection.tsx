import { FunctionComponent, useCallback } from "react";

const ColumnDirection: FunctionComponent = () => {
  const onMaskGroupIconClick = useCallback(() => {
    // Please sync "Portfolio Freelancer" to the project
  }, []);

  return (
    <div className="flex flex-col items-start justify-start relative gap-[10px] text-justify text-2xs text-white font-titre-grey">
      <img
        className="w-[451px] relative rounded-sm h-[177px] opacity-[0.29] z-[0]"
        alt=""
        src="/rectangle-31845.svg"
      />
      <div className="!m-[0] absolute top-[21px] left-[28px] flex flex-col items-start justify-start gap-[14px] z-[1]">
        <div className="w-[407px] flex flex-col items-start justify-start relative gap-[10px] text-3xs">
          <div className="flex flex-row items-start justify-start gap-[12px] z-[0]">
            <div className="flex flex-row items-start justify-start">
              <div className="w-[29.3px] relative h-[29.3px]">
                <img
                  className="absolute top-[0px] left-[0px] w-[29.3px] h-[29.3px]"
                  alt=""
                  src="/group-5129184.svg"
                />
                <div className="absolute top-[7.5px] left-[8px] tracking-[-0.01em] leading-[145.45%] font-semibold flex items-center w-[13.7px] h-[14.1px]">
                  +9
                </div>
              </div>
              <img
                className="w-[29.4px] relative h-[29.4px] object-cover cursor-pointer ml-[-13px]"
                alt=""
                src="/mask-group-12@2x.png"
                onClick={onMaskGroupIconClick}
              />
              <img
                className="w-[29.4px] relative h-[29.4px] object-cover ml-[-13px]"
                alt=""
                src="/group-5129982@2x.png"
              />
            </div>
            <div className="w-[151px] relative h-[37px] text-mid text-gray-1600">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start">
                <div className="w-[120px] relative tracking-[-0.01em] leading-[145.45%] font-semibold text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center h-[23px] shrink-0">
                  Name Project
                </div>
                <div className="w-[151px] relative text-3xs tracking-[-0.01em] leading-[145.45%] font-light flex items-center h-3.5 shrink-0">
                  Description project
                </div>
              </div>
            </div>
          </div>
          <img
            className="w-[3.4px] absolute !m-[0] top-[12px] left-[398.8px] h-[13.9px] z-[1]"
            alt=""
            src="/.svg"
          />
        </div>
        <div className="w-[156px] h-[39px] flex flex-col items-start justify-start p-2.5 box-border relative gap-[10px] text-left text-blue">
          <div className="w-[136px] absolute !m-[0] top-[24px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center h-[15px] shrink-0 z-[0]">
            Description of the project
          </div>
          <div className="w-[156px] absolute !m-[0] top-[0px] left-[0px] text-base leading-[113%] font-semibold flex items-center h-5 shrink-0 z-[1]">
            Mobile App Design
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-[3px] text-b">
          <div className="w-[97px] relative tracking-[-0.01em] leading-[145.45%] font-light whitespace-pre-wrap flex items-center h-6 shrink-0">
            12 Tasks | 61%
          </div>
          <div className="w-[393px] relative h-[8.8px]">
            <div className="absolute top-[0px] left-[0px] rounded-[5.98px] bg-lightskyblue-100 w-[393px] h-[8.8px]" />
            <div className="absolute top-[0px] left-[0px] rounded-[5.98px] bg-white w-[215.8px] h-[8.8px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnDirection;
