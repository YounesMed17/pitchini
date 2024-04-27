import { FunctionComponent, useCallback } from "react";
import LogicGate from "./LogicGate";

const Nav: FunctionComponent = () => {
  const onLogoPitchini1Click = useCallback(() => {
    // Please sync "Home Page" to the project
  }, []);

  return (
    <header className="self-stretch flex flex-row items-start justify-end max-w-full text-center text-base-1 text-gray-200 font-titre-grey">
      <div className=" fixed left-0 w-[1469.8px] flex flex-row items-start justify-start py-0 pr-0 pl-5 box-border relative max-w-full">
        <img
          className="h-[calc(100%_-_26.4px)] w-[229.6px] absolute !m-[0] top-[12.8px] bottom-[13.6px] left-[-17px] max-h-full object-contain cursor-pointer z-[1]"
          loading="lazy"
          alt=""
          src="/logo-pitchini-1@2x.png"
          onClick={onLogoPitchini1Click}
        />
        <LogicGate />
      </div>
    </header>
  );
};

export default Nav;
