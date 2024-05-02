import React, { useState, useEffect } from "react";

const FileDisplay: React.FC = () => {
  const [fileData, setFileData] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/file/${19}`); // Adjust URL as needed
        if (response.ok) {
          const file = await response.json();
          setFileData(file.file); // Assuming 'data' contains the base64-encoded file
        } else {
          console.error("Failed to fetch file");
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, []);

  return (
    <div>
      {fileData && (
        <div>
          <h2>Fetched File:</h2>
          <img src={fileData} alt="Fetched File" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default FileDisplay;
