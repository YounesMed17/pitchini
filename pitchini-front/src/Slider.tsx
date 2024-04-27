import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { get } from "./utilFunctions/getData";
import ColumnDirection3 from "./components/ColumnDirection3";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Slider() {
  const theme = useTheme();
  const [projects, setProjects] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const itemsPerPage = 2; // Number of items to show per slide

  useEffect(() => {
    async function fetchData() {
      const userId = 3;
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
    }

    fetchData();
  }, []);

  const maxSteps = Math.ceil(projects.length / itemsPerPage);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "fit-content", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        animateTransitions // Enable smooth transitions
        // Customize transition duration and delay using CSS
        style={{
          transitionDuration: "500ms", // Duration of the transition animation
          transitionDelay: "100ms", // Delay before the transition starts
        }}
      >
        {Array.from({ length: maxSteps }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              transition: "transform 500ms", // Apply transition effect on transform
            }}
          >
            {projects
              .slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage)
              .map((project) => (
                <ColumnDirection3
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tasksLeft="12 tasks | 61% done"
                  totalPrice={project.totalPrice}
                  projectId={project.id}
                  status={project.status}
                />
              ))}
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default Slider;
