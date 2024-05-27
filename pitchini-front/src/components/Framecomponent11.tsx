import { FunctionComponent, useMemo, CSSProperties } from "react";

export type FrameComponentType = {
  /** Style props */
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
  propBorderr?: CSSProperties["border"];
  propColorr?: CSSProperties["color"];

  /** Action props */
  onRectangleClick?: () => void;
  onFreelacerTextClick?: () => void;
  onRectangle2Click?: () => void;
  onRecruiterTextClick?: () => void;
};

const FrameComponent11: FunctionComponent<FrameComponentType> = ({
  propBorder,
  propColor,
  propBorderr,
  propColorr,
  onRectangleClick,
  onFreelacerTextClick,
  onRectangle2Click,
  onRecruiterTextClick,
}) => {
  const rectangleDivStyle: CSSProperties = useMemo(() => {
    return {
      border: propBorder,
    };
  }, [propBorder]);

  const recruiterStyle: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);
  const rectangle2DivStyle: CSSProperties = useMemo(() => {
    return {
      border: propBorderr,
    };
  }, [propBorderr]);

  const freelacerStyle: CSSProperties = useMemo(() => {
    return {
      color: propColorr,
    };
  }, [propColorr]);
  return (
    <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
      <div className="w-[595px] flex flex-row flex-wrap items-start justify-start gap-[9px] max-w-full">
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] h-[79px] flex-1 relative min-w-[190px]">
          <div
            className="absolute top-[0px] left-[0px] rounded-md bg-white shadow-[0px_4px_12px_-1px_rgba(0,_0,_0,_0.25)] box-border w-full h-full cursor-pointer border-[3px] border-solid border-grey hover:bg-white hover:box-border hover:border-[3px] hover:border-solid hover:border-blue"
            onClick={onRectangleClick}
            style={rectangle2DivStyle}
          />
          <div
            className="absolute top-[27px] left-[77px] text-9xl tracking-[-0.01em] font-medium font-montserrat text-grey text-center flex items-center justify-center w-[140px] h-[26px] cursor-pointer z-[1] hover:text-blue mq450:text-3xl"
            onClick={onFreelacerTextClick}
            style={freelacerStyle}
          >
            Freelacer
          </div>
        </button>
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] h-[79px] flex-1 relative min-w-[190px]">
          <div
            className="absolute top-[0px] left-[0px] rounded-md bg-white shadow-[0px_4px_12px_-1px_rgba(0,_0,_0,_0.25)] box-border w-full h-full cursor-pointer border-[3px] border-solid border-grey hover:box-border hover:border-[3px] hover:border-solid hover:border-blue"
            onClick={onRectangle2Click}
            style={rectangleDivStyle}
          />
          <div
            className="absolute top-[27px] left-[80px] text-9xl tracking-[-0.01em] font-medium font-montserrat text-grey text-center flex items-center justify-center w-[133px] h-[26px] cursor-pointer z-[1] hover:text-blue mq450:text-3xl"
            onClick={onRecruiterTextClick}
            style={recruiterStyle}
          >
            Recruiter
          </div>
        </button>
      </div>
    </div>
  );
};

export default FrameComponent11;
