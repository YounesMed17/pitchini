import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RateStars from "./RateStars";
import { useState } from "react";
import { TextField } from "@mui/material";
import { send } from "../utilFunctions/sendData";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Rate() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rate, setRate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function navigating() {}

  const handleRatingChange = (newValue: number) => {
    setRate(newValue);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  function handleSubmit() {
    setIsSubmitted(true);
    send(
      false,
      { rate: rate, comment: message, fromUser1: 3, toUser2: 24 },
      navigating,
      "http://localhost:3001/api/rate/"
    );
  }

  return (
    <>
      <React.Fragment>
        <div className="mt-[200px]">
          <Button variant="outlined" onClick={handleClickOpen}>
            Give Rate
          </Button>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              scrollbarWidth: "none", // Firefox
              WebkitOverflowScrolling: "touch", // iOS momentum scrolling
              "&::WebkitScrollbar": {
                display: "none", // Hide scrollbar for Chrome, Safari, etc.
              },
            },
          }}
        >
          <div className="p-[100px]">
            <h3 className=" text-18xl font-semibold font-inherit text-orange  shrink-0 [text-shadow:0.7px_0_0_rgba(0,_0,_0,_0),_0_0.7px_0_rgba(0,_0,_0,_0),_-0.7px_0_0_rgba(0,_0,_0,_0),_0_-0.7px_0_rgba(0,_0,_0,_0)] mq450:text-5xl mq1050:text-13xl">
              How would you rate the work
            </h3>
            <TextField
              id="Give a comment"
              label="Give a comment"
              variant="outlined"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              sx={{ marginBottom: "20px" }}
            />
            <RateStars onChange={handleRatingChange}></RateStars>
            <div className=" flex flex-col justify-center items-center">
              <Button
                sx={{ marginTop: "27px" }}
                variant="outlined"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>

          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
