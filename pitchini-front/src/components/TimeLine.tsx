function TimeLine(props: { step: string }) {
  const { step } = props;

  const specialclasses1 =
    "absolute top-[0px] left-[0px] rounded-[50%] bg-blue-1 w-full h-full flex items-center justify-center";
  const specialclasses2 =
    "absolute top-[16px] left-[37px] font-semibold inline-block w-3.5 h-[37px] min-w-[14px] z-[1] mq1000:text-11xl mq450:text-3xl text-white ";
  const normalclasses1 =
    "absolute top-[0px] left-[0px] rounded-[50%] bg-silver-200 box-border w-full h-full border-[0px] border-solid border-grey";
  const normalclasses2 =
    "absolute top-[13px] left-[32px] font-semibold inline-block w-[22px] h-[43px] min-w-[22px] z-[1] mq1000:text-11xl mq450:text-3xl";

  const specialText = "text-title";

  return (
    <div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-12 pl-11 box-border max-w-full mq1050:pl-[22px] mq1050:pr-6 mq1050:box-border">
        <div className="flex-1 flex flex-row items-end justify-start max-w-full [row-gap:20px] mq1000:flex-wrap">
          <div className="h-[86px] w-[86px] relative ">
            <div className={step == "01" ? specialclasses1 : normalclasses1} />
            <div className={step == "01" ? specialclasses2 : normalclasses2}>
              1
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start min-w-[229px] min-h-[43px] max-w-full mq1000:min-h-[auto]">
            <div className="self-stretch h-0.5 relative box-border z-[1] border-t-[2px] border-solid border-grey" />
          </div>
          <div className="h-[86px] w-[86px] relative">
            <div className={step == "02" ? specialclasses1 : normalclasses1} />
            <div className={step == "02" ? specialclasses2 : normalclasses2}>
              2
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start min-w-[235px] min-h-[43px] max-w-full mq1000:min-h-[auto]">
            <div className="self-stretch h-[3px] relative box-border z-[1] border-t-[3px] border-solid border-grey" />
          </div>
          <div className="h-[86px] w-[86px] relative">
            <div className={step == "03" ? specialclasses1 : normalclasses1} />
            <div className={step == "03" ? specialclasses2 : normalclasses2}>
              3
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-between gap-[20px] text-center text-11xl mq725:flex-wrap">
        <h3 className="m-0 h-[53px] w-[173px] relative text-inherit font-medium font-inherit inline-block shrink-0 mq1000:text-5xl mq450:text-lg">
          <span className={step == "01" ? specialText : ""}>Full Name</span>
        </h3>
        <h3 className="m-0 h-[53px] w-[242px] relative text-inherit font-medium font-inherit inline-block shrink-0 mq1000:text-5xl mq450:text-lg">
          <span className={step == "02" ? specialText : ""}>
            Personal Details
          </span>
        </h3>
        <div className="w-[180.4px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border">
          <h3 className="m-0 self-stretch relative text-inherit font-medium font-inherit  mq1000:text-5xl mq450:text-lg ">
            <span className={step == "03" ? specialText : ""}>Completion</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
