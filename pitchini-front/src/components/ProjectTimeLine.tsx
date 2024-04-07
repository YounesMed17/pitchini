function ProjectTimeline(props: { step: string }) {
  const { step } = props;
  const specialclasses1 =
    "absolute top-[0px] left-[0px] rounded-[50%] bg-blue-1 w-full h-full flex items-center justify-center";
  const specialclasses2 =
    "absolute top-[16px] left-[37px] font-semibold inline-block w-3.5 h-[37px] min-w-[14px] z-[1] mq1000:text-11xl mq450:text-3xl text-white ";
  const normalclasses1 =
    "absolute top-[0px] left-[0px] rounded-[50%] bg-silver-200 box-border w-full h-full border-[0px] border-solid border-grey";
  const normalclasses2 =
    "absolute top-[13px] left-[32px] font-semibold inline-block w-[22px] h-[43px] min-w-[22px] z-[1] mq1000:text-11xl mq450:text-3xl";

  return (
    <>
      <div className="self-stretch flex flex-row flex-wrap items-start justify-center max-w-full [row-gap:20px] text-left text-18xl">
        <div className="w-[86px] flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border">
          <div className="self-stretch h-[86px] relative">
            <div className={step == "01" ? specialclasses1 : normalclasses1} />
            <div className={step == "01" ? specialclasses2 : normalclasses2}>
              1
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end justify-start gap-[7px] min-w-[521px] max-w-full text-center text-11xl mq750:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start max-w-full">
            <div className="w-[377px] flex flex-row items-start justify-start py-0 px-3.5 box-border max-w-full">
              <div className="text-blue h-[53px] flex-1 relative font-medium inline-block mq450:text-lg mq1050:text-5xl">
                <p
                  className="m-0"
                  style={step == "01" ? { color: "#6495ED" } : {}}
                >
                  Share brief description
                </p>
              </div>
            </div>
            <div className="self-stretch h-[3px] relative box-border z-[1] border-t-[3px] border-solid border-grey" />
          </div>
          <div className="w-[414px] flex flex-row items-start justify-end py-0 px-3 box-border max-w-full text-grey">
            <div className="h-[53px] flex-1 relative font-medium inline-block max-w-full mq450:text-lg mq1050:text-5xl">
              <p
                className="m-0"
                style={step == "02" ? { color: "#6495ED" } : {}}
              >
                Add timeline and budget
              </p>
              <p className="m-0">&nbsp;</p>
            </div>
          </div>
        </div>
        <div className="w-[86px] flex items-center justify-center pt-2.5 px-0 pb-0 box-border">
          <div className="h-[86px] w-[86px] relative">
            <div className={step == "02" ? specialclasses1 : normalclasses1} />
            <div className={step == "02" ? specialclasses2 : normalclasses2}>
              2
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectTimeline;
