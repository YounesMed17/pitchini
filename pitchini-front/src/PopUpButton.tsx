import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FormAplication from "./components/FormAplication";
import Nav from "./components/Nav";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // <Button onClick={handleClose}>Disagree</Button>
  //<Button onClick={handleClose}>Agree</Button>
  return (
    <>
      <Nav></Nav>
      <React.Fragment>
        <div className="mt-[200px]">
          <Button variant="outlined" onClick={handleClickOpen}>
            slide in alert dialog
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
          <FormAplication></FormAplication>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>

      <Button
        variant="outlined"
        sx={{ marginTop: "100px", marginLeft: "200px" }}
      >
        <a href="https://api.preprod.konnect.network/lWb5LqI6u">
          Passer au payement
        </a>
      </Button>
    </>
  );
}
