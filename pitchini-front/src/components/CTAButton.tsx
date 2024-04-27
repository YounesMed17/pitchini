import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CTAButton: FunctionComponent = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onDashboardTextClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="w-[120.8px] flex flex-row flex-wrap items-end justify-start gap-[27px_11px] text-left text-sm-5 text-gray-200 font-titre-grey">
      <div
        className="w-[22.1px] relative h-[23.1px] opacity-[0.29] cursor-pointer"
        onClick={onGroupContainerClick}
      >
        <div className="absolute top-[0px] left-[0px] [background:linear-gradient(99.26deg,_#000)] w-[10.2px] h-[13.4px]" />
        <div className="absolute top-[9.7px] left-[11.9px] [background:linear-gradient(99.26deg,_#000)] w-[10.2px] h-[13.4px]" />
        <div className="absolute top-[15px] left-[0px] [background:linear-gradient(99.26deg,_#000)] w-[10.2px] h-[8.1px]" />
        <div className="absolute top-[0px] left-[11.9px] [background:linear-gradient(99.26deg,_#000)] w-[10.2px] h-[8.1px]" />
      </div>
      <div
        className="w-20 relative font-medium text-transparent !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center h-[20.9px] shrink-0 opacity-[0.29] cursor-pointer"
        onClick={onDashboardTextClick}
      >
        Dashboard
      </div>
      <img
        className="w-[25.4px] relative h-[25.4px] object-cover opacity-[0.29]"
        alt=""
        src="/portfolio-1096059-13@2x.png"
      />
      <div className="w-[62.1px] relative font-medium flex items-center h-[20.9px] shrink-0 opacity-[0.29]">
        Portfolio
      </div>
      <img
        className="w-[26.9px] relative h-[32.9px] object-cover opacity-[0.29]"
        alt=""
        src="/102-13@2x.png"
      />
      <div className="w-[70.3px] relative font-medium flex items-center h-[20.9px] shrink-0 opacity-[0.28]">
        Find Work
      </div>
      <img
        className="w-[26.2px] relative h-[23.2px] object-cover opacity-[0.29]"
        alt=""
        src="/inbox-13@2x.png"
      />
      <div className="w-[62.1px] relative font-medium flex items-center h-[20.9px] shrink-0 opacity-[0.29]">
        Inbox
      </div>
      <img
        className="w-[23.9px] relative h-[23.9px] object-cover opacity-[0.29]"
        alt=""
        src="/groupe-13@2x.png"
      />
      <div className="w-[62.1px] relative font-medium flex items-center h-[20.9px] shrink-0 opacity-[0.29]">
        Contact
      </div>
      <img
        className="w-[26.2px] relative h-[23.9px] object-cover opacity-[0.29]"
        alt=""
        src="/path-8-13@2x.png"
      />
      <div className="w-[62.1px] relative font-medium flex items-center h-[20.9px] shrink-0 opacity-[0.29]">
        Settings
      </div>
      <img
        className="w-[19.4px] relative h-[17px] opacity-[0.29]"
        alt=""
        src="/-icon-account-login2.svg"
      />
      <div className="w-[55.3px] relative font-medium flex items-center h-[20.2px] shrink-0 opacity-[0.29]">
        Log Out
      </div>
    </div>
  );
};

export default CTAButton;
