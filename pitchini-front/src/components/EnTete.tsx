import { FunctionComponent, useEffect, useState } from "react";
import { get } from "../utilFunctions/getData";
//import { useNavigate } from "react-router-dom";

const EnTete: FunctionComponent = () => {
  return (
    <header className="self-stretch h-[127px] bg-whitesmoke-100 flex flex-row items-start justify-between py-[17.5px] pr-[42px] pl-[41px] box-border top-[0] z-[99] sticky max-w-full gap-[20px] text-center text-xl text-gray-200 font-join-text mq750:pr-[21px] mq750:box-border">
      <img
        className="h-[92px] w-[304px] relative object-cover cursor-pointer"
        loading="lazy"
        alt=""
        src="/logo-pitchini-1@2x.png"
        //onClick={onLogoPitchini1Click}
      />
      <div className="w-[596px] flex flex-col items-start justify-start pt-[26px] px-0 pb-0 box-border max-w-full mq1050:w-0">
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq1050:hidden">
          <div className="w-[74px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[74px]">
              Policies
            </div>
          </div>
          <div className="w-[85px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[85px]">
              Discover
            </div>
          </div>
          <div className="w-[81px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div
              className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[81px] cursor-pointer"
              //onClick={onContactTextClick}
            >
              Contact
            </div>
          </div>
          <div className="w-[53px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div
              className="self-stretch relative tracking-[-0.01em] font-medium inline-block min-w-[53px] cursor-pointer"
              //onClick={onLoginTextClick}
            >
              Login
            </div>
          </div>
          <div className="flex flex-row items-start justify-start py-2 px-[21.5px] relative text-white font-montserrat">
            <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-md bg-grey1" />
            <div className="w-[42px] relative tracking-[-0.01em] font-medium inline-block min-w-[42px] z-[1]">
              Join
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnTete;
