import { Box, ImageList, ImageListItem } from "@mui/material";
import React, { useState, useEffect } from "react";

const UploadForm: React.FunctionComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pictures, setPictures] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("File", selectedFile);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
        // Optionally, you can handle successful upload here
      } else {
        console.error("Failed to upload file");
        // Optionally, you can handle upload failure here
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, you can handle errors here
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch pictures when the component mounts
    const fetchPictures = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/file/all");
        if (response.ok) {
          const data = await response.json();
          setPictures(data); // Update state with fetched pictures
        } else {
          console.error("Failed to fetch pictures");
        }
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };

    fetchPictures();
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="File" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <h2>Pictures</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="File" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <h2>Pictures</h2>
      <div className="flex justify-center items-center">
        <Box
          sx={{
            width: "80%",
            overflowY: "scroll",
          }}
        >
          <ImageList variant="masonry" cols={3} gap={8}>
            {pictures.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`http://localhost:3001/uploads/${item.link}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`http://localhost:3001/uploads/${item.link}?w=248&fit=crop&auto=format`}
                  alt="portfolio img"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
    </>
  );
};

export default UploadForm;
