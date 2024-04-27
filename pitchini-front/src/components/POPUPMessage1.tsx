import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const POPUPMessage1: FunctionComponent = () => {
  const navigate = useNavigate();

  const onInboxContainerClick = useCallback(() => {
    // Please sync "Page Inbox" to the project
  }, []);

  const onInboxTextClick = useCallback(() => {
    navigate("/page-discussions");
  }, [navigate]);

  const onYouHave5Click = useCallback(() => {
    // Please sync "Page Inbox" to the project
  }, []);

  const onFilterIconClick = useCallback(() => {
    // Please sync "Page Inbox" to the project
  }, []);

  const onMessageContainerClick = useCallback(() => {
    navigate("/page-discussions");
  }, [navigate]);

  return (
    <div className="w-[400px] relative bg-white h-[592px] overflow-hidden max-w-full max-h-full text-center text-2xs text-gray-500 font-titre-grey">
      <div className="absolute top-[0px] left-[calc(50%_-_200px)] bg-whitesmoke-100 w-[400px] h-[71px]" />
      <div className="absolute top-[146px] left-[calc(50%_-_200px)] bg-whitesmoke-100 w-[385px] h-[92px]" />
      <div
        className="absolute top-[12px] left-[18px] w-[151px] h-[47px] cursor-pointer text-xl text-gray-200"
        onClick={onInboxContainerClick}
      >
        <div
          className="absolute top-[0px] left-[0px] tracking-[-0.01em] font-medium cursor-pointer"
          onClick={onInboxTextClick}
        >
          Inbox
        </div>
        <div
          className="absolute top-[30px] left-[0px] text-2xs tracking-[-0.01em] font-light cursor-pointer text-gray-500"
          onClick={onYouHave5Click}
        >
          <span>{`You have `}</span>
          <span className="text-blue">5 Messages</span>
          <span> today.</span>
        </div>
      </div>
      <img
        className="absolute top-[22px] left-[353px] w-[27px] h-[27px] cursor-pointer"
        alt=""
        src="/filter.svg"
        onClick={onFilterIconClick}
      />
      <div className="absolute top-[71px] left-[calc(50%_+_185px)] w-[15px] h-[521px]">
        <div className="absolute top-[0px] left-[calc(50%_-_7.5px)] bg-whitesmoke-100 w-[15px] h-[521px]" />
        <img
          className="absolute top-[9px] left-[4px] w-2 h-2"
          alt=""
          src="/polygon-1.svg"
        />
      </div>
      <div className="absolute top-[94px] left-[30px] w-[340px] h-[34px] text-base text-dimgray-200 font-montserrat">
        <div className="absolute top-[4px] left-[0px] leading-[120%] font-light">
          S<span className="lowercase">EARCH MESSAGES</span>
        </div>
        <img
          className="absolute top-[0px] left-[317px] w-[23px] h-[26px] object-cover"
          alt=""
          src="/icon-search@2x.png"
        />
        <div className="absolute top-[33.5px] left-[calc(50%_-_170.5px)] box-border w-[341px] h-px border-t-[1px] border-solid border-dimgray-300" />
      </div>
      <img
        className="absolute top-[261px] left-[74px] w-0 h-0 object-cover"
        alt=""
        src="/frame-3@3x.png"
      />
      <div
        className="absolute top-[151px] left-[30px] w-[332px] h-[82px] cursor-pointer"
        onClick={onMessageContainerClick}
      >
        <div className="absolute top-[0px] left-[68px] w-[264px] h-[82px]">
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[-0.01em] font-medium text-gray-200">
            LOREM UPSUM
          </div>
          <div className="absolute top-[50px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            <p className="m-0">
              Hello, lorem ipsum est, en imprimerie, une suite de
            </p>
            <p className="m-0">
              <span>mots sans signification utilisée à titr</span>
              <span className="text-gray-1100">e provisoire</span>
              <span className="text-gray-500"> </span>
            </p>
          </div>
          <div className="absolute top-[7px] left-[221px] tracking-[-0.01em] font-light text-gray-1200">
            11:03 am
          </div>
          <div className="absolute top-[26px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            Project invitation
          </div>
        </div>
        <img
          className="absolute top-[16px] left-[0px] w-[51px] h-[51px]"
          alt=""
          src="/group-512918.svg"
        />
      </div>
      <div className="absolute top-[251px] left-[30px] w-[332px] h-[82px]">
        <div className="absolute top-[0px] left-[68px] w-[264px] h-[82px]">
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[-0.01em] font-medium text-gray-200">
            LOREM UPSUM
          </div>
          <div className="absolute top-[50px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            <p className="m-0">
              Hello, lorem ipsum est, en imprimerie, une suite de
            </p>
            <p className="m-0">
              <span>mots sans signification utilisée à titr</span>
              <span className="text-gray-1100">e provisoire</span>
              <span className="text-gray-500"> </span>
            </p>
          </div>
          <div className="absolute top-[7px] left-[221px] tracking-[-0.01em] font-light text-gray-1200">
            11:03 am
          </div>
          <div className="absolute top-[26px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            Project invitation
          </div>
        </div>
        <img
          className="absolute top-[16px] left-[0px] w-[51px] h-[51px]"
          alt=""
          src="/group-512918.svg"
        />
      </div>
      <div className="absolute top-[346px] left-[30px] w-[332px] h-[82px]">
        <div className="absolute top-[0px] left-[68px] w-[264px] h-[82px]">
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[-0.01em] font-medium text-gray-200">
            LOREM UPSUM
          </div>
          <div className="absolute top-[50px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            <p className="m-0">
              Hello, lorem ipsum est, en imprimerie, une suite de
            </p>
            <p className="m-0">
              <span>mots sans signification utilisée à titr</span>
              <span className="text-gray-1100">e provisoire</span>
              <span className="text-gray-500"> </span>
            </p>
          </div>
          <div className="absolute top-[7px] left-[221px] tracking-[-0.01em] font-light text-gray-1200">
            11:03 am
          </div>
          <div className="absolute top-[26px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            Project invitation
          </div>
        </div>
        <img
          className="absolute top-[16px] left-[0px] w-[51px] h-[51px]"
          alt=""
          src="/group-512918.svg"
        />
      </div>
      <div className="absolute top-[441px] left-[30px] w-[332px] h-[82px]">
        <div className="absolute top-[0px] left-[68px] w-[264px] h-[82px]">
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[-0.01em] font-medium text-gray-200">
            LOREM UPSUM
          </div>
          <div className="absolute top-[50px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            <p className="m-0">
              Hello, lorem ipsum est, en imprimerie, une suite de
            </p>
            <p className="m-0">
              <span>mots sans signification utilisée à titr</span>
              <span className="text-gray-1100">e provisoire</span>
              <span className="text-gray-500"> </span>
            </p>
          </div>
          <div className="absolute top-[7px] left-[221px] tracking-[-0.01em] font-light text-gray-1200">
            11:03 am
          </div>
          <div className="absolute top-[26px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            Project invitation
          </div>
        </div>
        <img
          className="absolute top-[16px] left-[0px] w-[51px] h-[51px]"
          alt=""
          src="/group-512918.svg"
        />
      </div>
      <div className="absolute top-[536px] left-[30px] w-[332px] h-[82px]">
        <div className="absolute top-[0px] left-[68px] w-[264px] h-[82px]">
          <div className="absolute top-[0px] left-[0px] text-xl tracking-[-0.01em] font-medium text-gray-200">
            LOREM UPSUM
          </div>
          <div className="absolute top-[50px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            <p className="m-0">
              Hello, lorem ipsum est, en imprimerie, une suite de
            </p>
            <p className="m-0">
              <span>mots sans signification utilisée à titr</span>
              <span className="text-gray-1100">e provisoire</span>
              <span className="text-gray-500"> </span>
            </p>
          </div>
          <div className="absolute top-[7px] left-[221px] tracking-[-0.01em] font-light text-gray-1200">
            11:03 am
          </div>
          <div className="absolute top-[26px] left-[0px] tracking-[-0.01em] leading-[145.45%] font-light text-left">
            Project invitation
          </div>
        </div>
        <img
          className="absolute top-[16px] left-[0px] w-[51px] h-[51px]"
          alt=""
          src="/group-512918.svg"
        />
      </div>
    </div>
  );
};

export default POPUPMessage1;
