import { FunctionComponent, useState, useCallback } from "react";
import POPUPNotification1 from "./POPUPNotification1";
import PortalPopup from "./PortalPopup";
import POPUPMessage1 from "./POPUPMessage1";

const NavBar: FunctionComponent = () => {
  const [isPOPUPNotificationOpen, setPOPUPNotificationOpen] = useState(false);
  const [isPOPUPMessageOpen, setPOPUPMessageOpen] = useState(false);

  const onLogoPitchini1Click = useCallback(() => {
    // Please sync "Home Page" to the project
  }, []);

  const openPOPUPNotification = useCallback(() => {
    setPOPUPNotificationOpen(true);
  }, []);

  const closePOPUPNotification = useCallback(() => {
    setPOPUPNotificationOpen(false);
  }, []);

  const openPOPUPMessage = useCallback(() => {
    setPOPUPMessageOpen(true);
  }, []);

  const closePOPUPMessage = useCallback(() => {
    setPOPUPMessageOpen(false);
  }, []);

  return (
    <>
      <div className="absolute top-[0.3px] left-[calc(50%_-_719.8px)] bg-whitesmoke-100 w-[1600px] h-[80.2px] text-center text-base-3 text-gray-200 font-titre-grey left-0">
        <div className="absolute top-[15px] left-[103px] w-[1232.9px] h-[50.2px]" />
        <div className="absolute top-[15px] left-[38px] flex flex-row items-center justify-start gap-[866px] w-[1450.9px]">
          <img
            className="w-[148px] relative h-[44.8px] object-cover cursor-pointer"
            alt=""
            src="/logo-pitchini-1@2x.png"
            onClick={onLogoPitchini1Click}
          />
          <div className="flex flex-row items-center justify-start gap-[40.7px] ml-auto">
            <img
              className="w-[20.4px] relative h-[23.1px] object-cover opacity-[0.86] cursor-pointer"
              alt=""
              src="/notf0121@2x.png"
              onClick={openPOPUPNotification}
            />
            <img
              className="w-[25.8px] relative h-[23.1px] object-cover opacity-[0.86] cursor-pointer"
              alt=""
              src="/notf02@2x.png"
              onClick={openPOPUPMessage}
            />
            <img
              className="w-[29.9px] relative h-[23.1px] object-cover opacity-[0.86]"
              alt=""
              src="/notf03@2x.png"
            />
            <div className="w-[59.7px] relative tracking-[-0.01em] font-medium flex items-center justify-center h-[17.7px] shrink-0 opacity-[0.86]">
              Orders
            </div>
            <img
              className="w-[50.2px] relative h-[50.2px] object-cover"
              alt=""
              src="/image6@2x.png"
            />
          </div>
        </div>
      </div>
      {isPOPUPNotificationOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePOPUPNotification}
        >
          <POPUPNotification1 //onClose={closePOPUPNotification}
           />
        </PortalPopup>
      )}
      {isPOPUPMessageOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePOPUPMessage}
        >
          <POPUPMessage1 // onClose={closePOPUPMessage} 
          />
        </PortalPopup>
      )}
    </>
  );
};

export default NavBar;
