import { FunctionComponent, useMemo, CSSProperties } from "react";

export type FrameComponent1Type = {
  /** Style props */
  frameHeaderAlignSelf?: CSSProperties["alignSelf"];
  frameHeaderFlex?: CSSProperties["flex"];

  /** Action props */
  onLogoPitchini1Click?: () => void;
  onContactTextClick?: () => void;
  onLoginTextClick?: () => void;
  onButtonContainerClick?: () => void;
};

const Navbar: FunctionComponent<FrameComponent1Type> = ({
  frameHeaderAlignSelf,
  frameHeaderFlex,
  onLogoPitchini1Click,
  onContactTextClick,
  onLoginTextClick,
  onButtonContainerClick,
}) => {
  const frameHeaderStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: frameHeaderAlignSelf,
      flex: frameHeaderFlex,
    };
  }, [frameHeaderAlignSelf, frameHeaderFlex]);

  return (
    <header
      className="self-stretch bg- flex flex-row items-start justify-between pt-[17px] pb-[18px] pr-[42px] pl-[41px] box-border top-[0] z-[99]  w-full gap-[20px] text-center text-xl text-gray-200 font-titre-grey mq950:pr-[21px] mq950:box-border"
      style={frameHeaderStyle}
    >
      <div className="h-[127px] w-[1512px] relative bg-whitesmoke hidden max-w-full" />
      <img
        className="h-[92px] w-[304px] relative object-cover cursor-pointer z-[1]"
        loading="lazy"
        alt=""
        src="/logo-pitchini-1@2x.png"
        onClick={onLogoPitchini1Click}
      />
      <div className="w-[596px] flex flex-col items-start justify-start pt-[26px] px-0 pb-0 box-border max-w-full mq950:w-0">
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq950:hidden">
          <div className="w-[74px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div
              className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[74px] z-[1] cursor-pointer hover:underline"
              onClick={onContactTextClick}
            >
              Policies
            </div>
          </div>
          <div className="w-[85px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[85px] z-[1] cursor-pointer hover:underline">
              Discover
            </div>
          </div>
          <div className="w-[81px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div
              className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[81px] cursor-pointer hover:underline"
              onClick={onContactTextClick}
            >
              Contact
            </div>
          </div>
          <div className="w-[53px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div
              className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[53px] cursor-pointer hover:underline"
              onClick={onLoginTextClick}
            >
              Login
            </div>
          </div>
          <div
            className="flex flex-row items-start justify-start py-2 px-[21.5px] relative cursor-pointer z-[1] text-white font-montserrat"
            onClick={onButtonContainerClick}
          >
            <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-md bg-black" />
            <div className="w-[42px] relative tracking-[-0.01em] font-medium inline-block min-w-[42px] cursor-pointer hover:underline">
              Join
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
