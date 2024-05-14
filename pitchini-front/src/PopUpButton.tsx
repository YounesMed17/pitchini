import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FormAplication from "./components/FormAplication";
import Nav from "./components/Nav";
import { get } from "./utilFunctions/getData";

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
  const [file2, setFile2] = React.useState<File | null>(null);
  const [preview2, setPreview2] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      console.log(imageUpload, "pppppppppppppppppppppppp");
      setFile(imageUpload);
      setPreview(URL.createObjectURL(imageUpload));
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      /*
      const res = await get(`http://localhost:3001/api/file/${19}`);
      setFile2(res.file);
      setPreview2(URL.createObjectURL(file2));*/
    }

    fetchData();
  }, []);
  ////////////////////////

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64String = event.target.result.split(",")[1]; // Extract base64 data

        try {
          const response = await fetch("http://localhost:3001/api/file/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: base64String,
              type: "dd",
              link: "dzdz",
              userId: 45,
            }),
          });

          if (response.ok) {
            console.log("Image uploaded successfully!");
          } else {
            console.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

      reader.readAsDataURL(selectedFile); // Read file as base64
    }
  };
  ////////

  const [imageData, setImageData] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleGetImage = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/file/${20}`, {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } else {
        console.error("Failed to retrieve image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  console.log(imageData);

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

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pick a file </span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={loadImage}
        />
      </label>
      {preview && preview !== "" && (
        <div className="w-full flex flex-col items-start gap-3">
          <span>{preview}</span>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={preview} alt="profile-upload" />
            </div>
          </div>
        </div>
      )}
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      <div>
        <button onClick={handleGetImage}>Get Image</button>
        {imageUrl && (
          <div>
            <h2>{imageUrl}</h2>
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
    </>
  );
}
