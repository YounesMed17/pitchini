import {
  alpha,
  Badge,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { get } from "../utilFunctions/getData";
import { modifyData } from "../utilFunctions/modifyData";
import { useNavigate } from "react-router-dom";
import ApplyProjectPopup from "./ApplyProjectsPopup";
import { TransitionProps } from "@mui/material/transitions";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
      
      .MuiBadge-badge {
          background-color: ${alpha(theme.palette.error.main, 0.1)};
          color: ${theme.palette.error.main};
          min-width: 16px; 
          height: 16px;
          padding: 0;
  
          &::after {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
              content: "";
          }
      }
  `
);
const HeaderNotifications = () => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notification, setNotification] = useState<any[]>([]); // Define domainAndSkills state

  const handleOpen = (): void => {
    setOpen(true);
    setClicked(true);
    setUnreadCount(0);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleClose2 = (): void => {
    setOpen2(false);
  };
  useEffect(() => {
    async function fetchData() {
      const userId = 9;
      const res = await get(
        `http://localhost:3001/api/notification/allUsernotifications/${userId}`
      );
      const values = await res;

      const notifications = values.map((item) => ({
        id: item.id,
        message: item.message,
        isRead: item.isRead,
        userId: item.userId,
        type: item.type,
        freelancerId: item.freelancerId,
        creationDate: item.creationDate,
        isProjectInvite: item.isProjectInvite,
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
  console.log(notification);
  async function updateNotificationStatus() {
    const unreadNotification = notification.filter(
      (notification) => !notification.isRead
    );
    for (let i = 0; i < unreadNotification.length; i++) {
      await modifyData(
        {
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
  if (clicked && !isOpen) {
    updateNotificationStatus();
    setClicked(false);
  }

  const navigate = useNavigate();

  function handleProfileClick(id: number) {
    if (id != null) navigate(`/freelancerPortfolio/${id}`);
  }

  const getDuration = (creationDate) => {
    const currentDate = new Date();

    if (creationDate != null) {
      const distance =
        new Date(currentDate).getTime() - new Date(creationDate).getTime();
      const seconds = Math.floor(distance / 1000);

      if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
      } else {
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
      }
    }
  };
  const [open2, setOpen2] = useState(false);

  function handleProject() {
    setOpen2(true);
  }

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton style={{ color: "black" }} ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={unreadCount}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsActiveIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            p: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f1f1f1",
          }}
        >
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <List
          sx={{
            p: 0,
          }}
          className="md:w-[300px] w-[200px]"
        >
          {notification.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                p: 2,
                minWidth: 350,
                display: { xs: "block", sm: "flex" },
              }}
            >
              <Box flex="1" className="md:mr-[50px] mr-[17px]">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: item.isRead ? "gray" : "red",
                    }}
                  >
                    {item.type}
                  </Typography>
                  <Typography variant="caption">
                    {getDuration(item.creationDate)}
                  </Typography>
                </Box>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {item.message}
                </Typography>
                {/* Conditionally render buttons based on freelancerId */}
                {item.freelancerId && !item.isProjectInvite && (
                  <Box mt={1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleProfileClick(item.freelancerId)}
                      sx={{
                        ml: 1,
                        padding: "5px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Check Profile
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleProfileClick(item.freelancerId)}
                      sx={{
                        ml: 1,
                        padding: "5px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                )}
                {item.isProjectInvite && (
                  <Box mt={1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleProject()}
                      sx={{
                        ml: 1,
                        padding: "5px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Check Project
                    </Button>
                    <Dialog
                      open={open2}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose2}
                      aria-describedby="alert-dialog-slide-description"
                      PaperProps={{
                        style: {
                          scrollbarWidth: "none", // Firefox
                          WebkitOverflowScrolling: "touch", // iOS momentum scrolling
                        },
                      }}
                    >
                      <ApplyProjectPopup
                        projectId={item.userId}
                        freelancerId={item.freelancerId}
                        setOpen2={setOpen2}
                      ></ApplyProjectPopup>
                    </Dialog>
                  </Box>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default HeaderNotifications;
