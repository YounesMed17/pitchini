import { FunctionComponent, useState, useCallback, useEffect } from "react";
import POPUPNotification from "./POPUPNotification";
import PortalPopup from "./PortalPopup";
import { get } from "../utilFunctions/getData";
import { modifyData } from "../utilFunctions/modifyData";

const LogicGate: FunctionComponent = () => {
  const [isPOPUPNotificationOpen, setPOPUPNotificationOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [notification, setNotification] = useState<any[]>([]); // Define domainAndSkills state
  const [unreadCount, setUnreadCount] = useState(0);

  const openPOPUPNotification = useCallback(() => {
    setPOPUPNotificationOpen(true);
    setClicked(true);
  }, []);

  const closePOPUPNotification = useCallback(() => {
    setPOPUPNotificationOpen(false);
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/notification/allnotifications"
      );
      const values = await res;

      const notifications = values.map((item) => ({
        id: item.id,
        message: item.message,
        isRead: item.isRead,
        userId: item.userId,
      }));
      // Sort notifications with isRead === 0 at the beginning
      notifications.sort((b, a) => b.isRead - a.isRead);

      setNotification(notifications);

      // Calculate unread count after setting notifications
      const UnreadCount = notifications.filter(
        (notification) => !notification.isRead
      ).length;
      setUnreadCount(UnreadCount);
    }

    fetchData();
  }, []);

  async function updateNotificationStatus() {
    const unreadNotification = notification.filter(
      (notification) => !notification.isRead
    );
    for (let i = 0; i < unreadNotification.length; i++) {
      await modifyData(
        {
          message: unreadNotification[i].message,
          userId: unreadNotification[i].userId,
          isRead: 1,
        },
        `http://localhost:3001/api/notification/modifyNotification${unreadNotification[i].id}`
      );
    }
    // After updating notifications, recalculate the unread count
    const updatedNotifications = notification.map((item) =>
      unreadNotification.some((unread) => unread.id === item.id)
        ? { ...item, isRead: 1 }
        : item
    );
    setNotification(updatedNotifications);
    const updatedUnreadCount = updatedNotifications.filter(
      (notification) => !notification.isRead
    ).length;
    setUnreadCount(updatedUnreadCount);
  }

  if (clicked && !isPOPUPNotificationOpen) {
    updateNotificationStatus();
    console.log("clicked +  + !isPOPUPNotificationOpen");

    setClicked(false);
  }
  console.log(unreadCount);
  return (
    <>
      <div className="  flex-1 bg-whitesmoke-100 flex flex-row items-start justify-end pt-[23px] px-[141.3px] pb-[23.1px] box-border gap-[25.8px] max-w-full text-center text-base-1 text-gray-200 font-titre-grey mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[70px] mq750:pr-[70px] mq750:box-border">
        <div className="h-[95.9px] w-[1449.8px] relative bg-whitesmoke-100 hidden max-w-full" />
        <div className="flex flex-col items-start justify-start pt-[9.5px] px-0 pb-0 relative">
          <p
            className={
              unreadCount > 0
                ? "z-10 absolute top-[-11px] left-[13px] text-white z-5 text-lg w-[19px] h-[19px] rounded-full bg-red-500 flex items-center justify-center"
                : "hidden"
            }
          >
            {unreadCount}
          </p>
          <img
            className="w-[25.7px] h-[30.2px] relative object-cover cursor-pointer z-[1] "
            loading="lazy"
            alt=""
            src="/notif_icon.png"
            onClick={openPOPUPNotification}
          />
        </div>
        <div className="flex flex-col items-start justify-start pt-[9.5px] px-0 pb-0">
          <img
            className="w-[33.2px] h-[30.2px] relative object-cover cursor-pointer z-[1]"
            loading="lazy"
            alt=""
            src="/notf02@2x.png"
          />
        </div>
        <div className="flex flex-col items-start justify-start pt-[9.5px] px-0 pb-0">
          <img
            className="w-[36.2px] h-[30.2px] relative object-cover z-[1]"
            loading="lazy"
            alt=""
            src="/notf03@2x.png"
          />
        </div>
        <div className="w-[50px] flex flex-col items-start justify-start pt-[13.2px] px-0 pb-0 box-border">
          <div className="self-stretch h-[23px] relative tracking-[-0.01em] font-medium flex items-center justify-center z-[1]">
            Orders
          </div>
        </div>
        <img
          className="h-[49.8px] w-[49.8px] relative object-contain z-[1]"
          loading="lazy"
          alt=""
          src="/mask-group@2x.png"
        />
      </div>
      {isPOPUPNotificationOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePOPUPNotification}
        >
          <POPUPNotification
            notifications={notification}
            onClickFunction={updateNotificationStatus}
          />
        </PortalPopup>
      )}
    </>
  );
};

export default LogicGate;
