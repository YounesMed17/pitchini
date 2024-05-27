import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/system";

interface HorizontalLinearAlternativeLabelStepperProps {
  relatedTo: string;
  step: number;
}

let steps1 = ["Project description", "Services and Budget", "Completion"];
let steps2 = ["General Informations", "Work & Skills", "Set Password"];

const StyledStepLabel = styled(StepLabel)({
  fontSize: "18px",
  fontWeight: "bold",
});

const HorizontalLinearAlternativeLabelStepper: React.FC<
  HorizontalLinearAlternativeLabelStepperProps
> = ({ relatedTo, step }) => {
  const steps =
    relatedTo == "singupfreelancer"
      ? steps2
      : relatedTo == "project"
      ? steps1
      : [];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={step}
        alternativeLabel
        sx={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StyledStepLabel>{label}</StyledStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalLinearAlternativeLabelStepper;
