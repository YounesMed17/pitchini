import { FunctionComponent, useState } from "react";
import "./Entete.css";
import Nav from "./Nav";
interface UserData {
  nickname: string;
}

interface Props {
  user: UserData | undefined;
}

const LeftNav: FunctionComponent<Props> = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <div
        className={` overflow-y-hidden HABET  ${
          sidebarOpen ? "w-[214.6px]" : "w-[90.6px]"
        } bg-whitesmoke-300 shrink-0 flex flex-culumn items-start justify-start relative gap-[7.5px]  transition-all duration-500 ease-in-out `}
      >
        <img
          className="w-[33.7px] h-[33.7px]  top-[10px] object-contain rounded-full ml-260px cursor-pointer absolute right-[40px] "
          alt=""
          src="/fleche.png"
          onClick={handleToggleSidebar}
        />

        {sidebarOpen && (
          <div className=" zid h-[594px] w-[184.8px] !m-[0] relative top-[21.4px] left-[calc(50%_-_102.8px)] flex flex-col items-center justify-start gap-[1.6px] z-[1] overflow-x-hidden">
            <div className="self-stretch flex flex-col items-start justify-center gap-[9px]">
              <img
                className="w-[143.7px] h-[143.7px] relative object-contain rounded-full"
                alt=""
                src="/avatarSouhir.png"
              />

              <div className="self-stretch relative  flex items-center justify-center tracking-[-0.01em] leading-[28.1px] font-semibold mq450:text-xl mq450:leading-[22px] items- justify-center">
                {user?.nickname}
              </div>
            </div>
            <div className="w-[120.8px]   mt-10 flex flex-row flex-wrap items-end justify-start py-0 pr-[7.7px] pl-0 box-border  gap-5 text-left text-sm-5 text-gray-1400 mq450:max-w-[calc(100%_-_8px)]">
              <div className="flex aa  ">
                <img
                  className="h-[20.4px] w-[20px] relative object-contain"
                  alt=""
                  src="/dash.png"
                />
                <div className="relative font-medium  inline-block  min-w-[80px] shrink-0 cursor-pointer">
                  Dashboard
                </div>
              </div>
              <div className="flex aa">
                <img
                  className="h-[25.4px] w-[25px] relative object-contain"
                  alt=""
                  src="/port.png"
                />
                <div className="relative font-medium inline-block min-w-[62px] shrink-0 cursor-pointer">
                  Portfolio
                </div>
              </div>
              <div className="flex aa">
                <img
                  className="h-[28.9px] w-[23px] mb-10px relative object-contain"
                  alt=""
                  src="/work.png"
                />
                <div className="relative font-medium text-gray-1300 inline-block min-w-[70px] shrink-0 cursor-pointer">
                  Find Work
                </div>
              </div>
              <div className="flex aa">
                <img
                  className="h-[23.2px] w-[23px] relative object-contain"
                  alt=""
                  src="/box.png"
                />
                <div className="w-[62px] relative font-medium flex items-center shrink-0 cursor-pointer">
                  Inbox
                </div>
              </div>
              <div className="flex aa">
                <img
                  className="h-[23.9px] w-[23px] relative object-contain"
                  alt=""
                  src="/contact.png"
                />
                <div className="relative font-medium inline-block min-w-[62px] shrink-0 cursor-pointer">
                  Contact
                </div>
              </div>
              <div className="flex aa">
                <img
                  className="h-[23.9px] w-[26px] relative object-contain"
                  alt=""
                  src="/settings.png"
                />
                <div className="relative font-medium inline-block min-w-[62px] shrink-0 cursor-pointer">
                  Settings
                </div>
              </div>
              <div className="flex aa">
                <img
                  className="h-[17px] w-[19px] relative"
                  alt=""
                  src="/-icon-account-login2.svg"
                />
                <div className="relative font-medium inline-block min-w-[55px] shrink-0 cursor-pointer">
                  Log Out
                </div>
              </div>
            </div>
          </div>
        )}
        {!sidebarOpen && (
          <div className="zid h-[594px] w-[204.8px] !m-[0] relative top-[21.4px] left-[calc(50% - 102.8px)] flex flex-col items-center justify-start gap-[10px] z-[1]">
            <div className="w-[20.8px] mt-10 flex flex-col items-end justify-start py-0 pr-[7.7px] pl-0 box-border gap-5 mq450:max-w-[calc(100% - 8px)]">
              <img
                className="h-[20.4px] w-[20px] relative object-contain"
                alt=""
                src="/imagedash.png"
              />
              <img
                className="h-[25.4px] w-[25px] relative object-contain"
                alt=""
                src="/portfolio-1096059-121@2x.png"
              />
              <img
                className="h-[28.9px] w-[23px] mb-10px relative object-contain"
                alt=""
                src="/imagesearch.png"
              />
              <img
                className="h-[23.2px] w-[23px] relative object-contain"
                alt=""
                src="/imagebox.png"
              />
              <img
                className="h-[23.9px] w-[23px] relative object-contain"
                alt=""
                src="/groupe-1@2x.png"
              />
              <img
                className="h-[23.9px] w-[26px] relative object-contain"
                alt=""
                src="/path-8-12@2x.png"
              />
              <img
                className="h-[17px] w-[19px] relative"
                alt=""
                src="/-icon-account-login2.svg"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeftNav;
