import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import OrderForm from "./orderProductForm";
import { send } from "../utilFunctions/sendData";
import { get } from "../utilFunctions/getData";
import { modifyData } from "../utilFunctions/modifyData";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProductCardProps {
  userId: number;
  productId: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function ProductCard({
  userId,
  productId,
  image,
  title,
  description,
  price,
}: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const [tokkens, setUserTokkens] = useState(0);

  const handleClickOpen = () => {
    if (tokkens >= price) setOpen(true);
    else alert("You don't have enough PITCHINI Coins");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/user/${userId}`);

      setUserTokkens(res.nbrTokken);
    }

    fetchData();
  }, []);

  function voided() {}

  const handleFormSubmit = async (formData: any) => {
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
    await modifyData(
      { nbrTokken: tokkens - price },
      `http://localhost:3001/api/user/${userId}`
    );

    setOpen(false);
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          height: { xs: "auto", md: 350 },
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={`http://localhost:3001/uploads/${image}`}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <div className="flex items-center ">
            <Typography
              gutterBottom
              variant="h6"
              color="gray"
              sx={{ fontWeight: "550" }}
              component="div"
            >
              {price}
            </Typography>
            <img
              className="mb-[5px]"
              width="35px"
              src="/gold-p.png"
              alt="P"
            ></img>
          </div>
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
