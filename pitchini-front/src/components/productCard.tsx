import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import OrderForm from "./orderProductForm";
import { send } from "../utilFunctions/sendData";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductCard() {
  const userId = 3;
  const productId = 1;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function voided() {}
  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
    send(
      false,
      {
        userId,
        productId,
        name: formData.name,
        city: formData.city,
        adress: formData.city,
        phoneNumber: formData.phoneNumber,
      },
      voided,
      "http://localhost:3001/api/orders/"
    );
    setOpen(false);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/productTestwebp.webp"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Screen monitor 144Hz
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wide screen good for work or gaming, 144Hz, size 25
          </Typography>
          <Typography gutterBottom variant="h6" color="red" component="div">
            750 T
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" onClick={handleClickOpen}>
            Get it now
          </Button>
        </CardActions>
      </Card>

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
        <OrderForm onSubmit={handleFormSubmit} />
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
