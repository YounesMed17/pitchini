import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useState } from "react";

interface ChooseAvatarProps {
  onChange: (selectedAvatar: any) => void; // Callback to send selected avatar to parent
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChooseAvatar: React.FC<ChooseAvatarProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const sendAvatarData = () => {
    onChange(selectedAvatar); // Invoke the onChange callback with selectedAvatar
    handleClose(); // Close the dialog after sending data
  };

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Choose your Avatar
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="pl-[120px] pr-[120px] pt-[40px] mb-[70px]">
          <h3 className="text-18xl text-center font-semibold font-inherit text-orange">
            Choose an avatar for your profile
          </h3>
          <div className="flex justify-center flex-wrap items-start gap-[40px]">
            {avatarOptions.map((avatar, index) => (
              <img
                key={index}
                src={avatar.url}
                width="150px"
                alt=""
                style={{
                  cursor: "pointer",
                  boxShadow:
                    selectedAvatar === avatar
                      ? "0px 0px 20px rgba(0, 0, 0, 0.5)"
                      : "none",
                  borderRadius: "50%", // Apply 50% border radius
                }}
                onClick={() => handleAvatarSelect(avatar)}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0px 0px 10px rgba(0, 0, 0, 0.5)";
                }}
                onMouseOut={(e) => {
                  if (selectedAvatar !== avatar) {
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
            ))}
          </div>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendAvatarData}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const avatarOptions = [
  { url: "/user.png" },
  { url: "/woman.png" },
  { url: "/woman1.png" },
  { url: "/man.png" },
  { url: "/gamer.png" },
  { url: "/user.png" },
];

export default ChooseAvatar;
