import { FunctionComponent, useEffect, useState } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";
interface PortfolioProjectsProps {
  userId: number;
}
const PortfolioProjects: FunctionComponent<PortfolioProjectsProps> = ({
  userId,
}) => {
  const [pictures, setPictures] = useState<any[]>([]);
  useEffect(() => {
    // Fetch pictures when the component mounts
    const fetchPictures = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/file/user/${userId}`
        );

        const data = await response.json();
        setPictures(data);
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };

    fetchPictures();
  }, []); // Empty dependency array to run effect only once
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[85px] shrink-0 [debug_commit:1de1738] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey lg:gap-[42px] mq750:gap-[21px]">
      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="w-[800px] flex flex-col items-start justify-start gap-[29.5px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <div className="w-[550px] flex flex-col items-start justify-start gap-[36.8px] max-w-full mq750:gap-[18px]">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="w-[212px] relative leading-[22px] uppercase font-medium inline-block shrink-0">
                  PORTFOLIO
                </div>
              </div>
              <h1 className="m-0 self-stretch h-[1.7px] relative text-21xl leading-[112.94%] font-semibold font-inherit text-orange inline-block shrink-0 [text-shadow:1px_0_0_rgba(0,_0,_0,_0),_0_1px_0_rgba(0,_0,_0,_0),_-1px_0_0_rgba(0,_0,_0,_0),_0_-1px_0_rgba(0,_0,_0,_0)] mq450:text-5xl mq450:leading-[27px] mq1050:text-13xl mq1050:leading-[36px]">
                Check My Wonderful Work
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[41px] max-w-full text-lg text-gray-100 mq750:gap-[20px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full"></div>
        <div className="flex justify-center items-center">
          <Box
            sx={{
              width: "80%",
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
      </div>
    </div>
  );
};

export default PortfolioProjects;
