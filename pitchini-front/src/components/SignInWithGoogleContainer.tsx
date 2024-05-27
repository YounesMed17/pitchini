import { FunctionComponent, useMemo, CSSProperties } from "react";

export type SignInWithGoogleContainerType = {
  /** Style props */
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];

  /** Action props */
  onGoogleFormInputClick?: () => void;
  onSIGNINTextClick?: () => void;
  handleLogin?: () => void;
};

const SignInWithGoogleContainer: FunctionComponent<
  SignInWithGoogleContainerType
> = ({
  propBorder,
  propColor,
  onGoogleFormInputClick,
  onSIGNINTextClick,
  handleLogin,
}) => {
  const googleFormInputStyle: CSSProperties = useMemo(() => {
    return {
      border: propBorder,
    };
  }, [propBorder]);

  const sIGNINStyle: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[21px] max-w-full">
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch h-[79px] relative"
        onClick={handleLogin}
      >
        <div
          className="absolute top-[0px] left-[0px] rounded-md bg-white shadow-[0px_4px_12px_-1px_rgba(0,_0,_0,_0.25)] box-border w-full h-full cursor-pointer border-[3px] border-solid border-gray-4 hover:box-border hover:border-[3px] hover:border-solid hover:border-blue"
          onClick={onGoogleFormInputClick}
          style={googleFormInputStyle}
        />
        <div
          className="absolute top-[27px] left-[163px] text-5xl tracking-[-0.01em] leading-[29.6px] font-medium font-montserrat text-gray-4 text-center flex items-center justify-center w-[313.4px] h-[25.5px] cursor-pointer z-[1] hover:text-blue mq450:text-lgi"
          onClick={onSIGNINTextClick}
          style={sIGNINStyle}
        >
          SIGN IN
        </div>
      </button>
    </div>
  );
};

export default SignInWithGoogleContainer;
