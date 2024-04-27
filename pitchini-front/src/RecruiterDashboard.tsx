import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
////////////////////////////////////////////
import { get } from "./utilFunctions/getData";
import { useEffect, useState } from "react";
import ColumnDirection3 from "./components/ColumnDirection3";
import NavBar from "./components/NavBar1";
import Charts from "./components/Charts";
import { Button, Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { modifyData } from "./utilFunctions/modifyData";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function RecruiterDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [inProgressProjects, setInProgressProjects] = useState<any[]>([]);
  const [doneProjects, setDoneProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [domaine1, setDomaine1] = useState("");
  const [domaine2, setDomaine2] = useState("");

  const getMonthName = (date: Date): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[date.getMonth()];
  };
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const month = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    month.unshift(monthName);
  }

  // Now monthsWithSalaries array contains objects representing each month with its associated salary

  useEffect(() => {
    async function fetchData() {
      const userId = 25;
      const res = await get(
        `http://localhost:3001/api/project/userProjects${userId}`
      );
      const values = await res;

      const projectList = values.map((item) => ({
        title: item.name,
        description: item.description,
        totalPrice: item.totalPrice,
        deadLine: item.deadLine,
        status: item.status,
        finishedDate: new Date(item.finishedDate),
        id: item.id,
      }));
      setProjects(projectList);

      const inProgress = projectList.filter(
        (project) => project.status === "inProgress"
      );
      setInProgressProjects(inProgress);

      const done = projectList.filter((project) => project.status === "done");
      setDoneProjects(done);
    }

    fetchData();
  }, []);

  function monthSalarySum(month: string) {
    console.log(month);
    let sum = 0;
    doneProjects.forEach((item) => {
      getMonthName(item.finishedDate) == month ? (sum += item.totalPrice) : "";
    });
    return sum;
  }

  const monthsWithSalaries = month.map((monthName) => {
    const salary = monthSalarySum(monthName);
    return salary;
  });

  const data = {
    labels: month,
    datasets: [
      {
        label: "Dataset 1",
        data: monthsWithSalaries.slice(0, 12),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const customScrollbarStyle = {
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
    "&::WebkitScrollbar": { display: "none" }, // WebKit/Blink
  };

  /////////////////////////////////////////////
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Determine the screen size threshold where 'open' should be false
      const isSmallScreen = screenWidth <= 768;

      // Update the 'open' state based on the screen size
      setOpen(!isSmallScreen);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial call to set the initial state based on window width
    handleResize();

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function handleDrawer() {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const [showDone, setShowDone] = useState(false);

  function handleDoneProjects() {
    setShowDone(true);
  }
  function handleInProgressProjects() {
    setShowDone(false);
  }

  function updateTasks() {}
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawer}
        edge="start"
        sx={{
          marginRight: 5,

          ...(open && { display: "none" }),
        }}
      ></IconButton>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="md:ml-[50px] ml-[5px]"
      >
        <DrawerHeader />
        <div className="mb-[50px] flex flex-row items-start justify-start ml-[50px] text-left text-13xl text-dimgray-400">
          <div className="tracking-[0.02em]  leading-[131%] font-extrabold !bg-clip-text [background:linear-gradient(99.26deg,_#fe504b,_#f9c928)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block h-[89px] shrink-0">
            <p className="m-0">The Only Place To</p>
            <p className="m-0">Look For Your Projets</p>
          </div>
        </div>
        <div className="flex flex-col justify-start  items-start flex-wrap">
          <div className="flex gap-[35px]">
            <div
              className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
              onClick={handleDoneProjects}
            >
              Done Projects
            </div>

            <div
              className=" tracking-[-0.01em] leading-[145.45%] font-semibold  !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] h-11 shrink-0"
              onClick={handleInProgressProjects}
            >
              In Progress Projects
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div
              style={customScrollbarStyle}
              className={
                !showDone
                  ? "custom-scrollbar w-screen max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-5"
                  : "hidden"
              }
            >
              {inProgressProjects.map((project) => (
                <ColumnDirection3
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  totalPrice={project.totalPrice}
                  projectId={project.id}
                  status={project.status}
                  onNewTask={updateTasks}
                  userRole="recruiter"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div
              style={customScrollbarStyle}
              className={
                showDone
                  ? "custom-scrollbar w-screen max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg gap-5"
                  : "hidden"
              }
            >
              {doneProjects.map((project) => (
                <ColumnDirection3
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  totalPrice={project.totalPrice}
                  projectId={project.id}
                  status={project.status}
                  onNewTask={updateTasks}
                  userRole="recruiter"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-[700px] sm:w-300 w-150">
          <Charts data={data} />
        </div>
      </Box>
    </Box>
  );
}
