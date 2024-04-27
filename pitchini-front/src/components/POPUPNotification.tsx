function POPUPNotification(props: { notifications; onClickFunction }) {
  const { notifications, onClickFunction } = props;
  const customScrollbarStyle = {
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
    "&::WebkitScrollbar": { display: "none" }, // WebKit/Blink
  };
  //onClickFunction();

  return (
    <>
      <div
        className="bg-white h-[592px] max-w-full max-h-full text-center text-gray-500 font-titre-grey overflow-y-auto "
        style={customScrollbarStyle}
      >
        <div className="  bg-whitesmoke-100 w-[400px] h-[50px] mt-[0px]  flex justify-center items-center pb-[25px]">
          <p className=" font-medium">Notifications</p>
        </div>
        <div className="divide-y divide-gray-200  ">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 hover:bg-gray-50 cursor-pointer  flex flex-col justify-start items-start h-[40px] "
            >
              <p
                className={
                  notif.isRead
                    ? "text-[16px] text-gray-800 "
                    : "text-[16px] text-red-400 "
                }
              >
                {notif.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default POPUPNotification;
