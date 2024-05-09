import { FunctionComponent, useEffect, useState } from "react";
import { get } from "../utilFunctions/getData";
import { Rating, Typography } from "@mui/material";

interface PortfolioTestimonialsProps {
  userId: string; // Assuming userId is a string, adjust the type accordingly
}

const PortfolioTestimonials: FunctionComponent<PortfolioTestimonialsProps> = ({
  userId,
}) => {
  const [rates, setRates] = useState<
    { rate: number; comment: string; fromUser: number }[]
  >([]); // Specify type for useState

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(
          `http://localhost:3001/api/rate/allUserRates/${userId}`
        );

        const mappedRates = res.map((item: any) => ({
          // Adjust type of 'item' to any if necessary
          rate: item.rate,
          comment: item.comment,
          fromUser: item.fromUser1,
        }));

        setRates(mappedRates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchData();
  }, [userId]); // Include 'userId' in the dependency array

  console.log(rates);

  return (
    <div className="bg-[#f2f2f2] mb-[70px] w-full pt-[30px] pb-[140px] flex flex-col items-start justify-start gap-[89px] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey lg:gap-[44px] mq750:gap-[22px]">
      <div className="self-stretch relative flex flex-col items-start justify-start gap-[43px] max-w-full mq750:gap-[21px]">
        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <div className="flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="leading-[22px] uppercase font-medium inline-block shrink-0">
                  TESTIMONIALS
                </div>
              </div>
              <h1 className="m-0 self-stretch relative md:text-21xl text-[20px] font-semibold font-inherit text-orange mt-[-2px]">
                What People Say About Me
              </h1>
            </div>
          </div>
          <div className="mt-[25px] self-stretch h-7 md:text-sm text-[14px] ml-[70px] mr-[70px] leading-[146%] text-grey2 inline-block shrink-0 mt-[-5.9px]">
            All other users rates
          </div>
        </div>
        <img
          className="md:w-[150px] w-[100px] absolute md:left-[44.2%] left-[40%] md:top-[110%] top-[150%] z-[10]"
          alt=""
          src="/avatargirl.webp"
        />

        <div className="ml-[80px] mr-[50px] flex flex-wrap gap-[70px] justify-start items-start ">
          {rates.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-start"
            >
              <Typography component="legend">{item.comment}</Typography>
              <Rating name="read-only" value={item.rate} readOnly />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioTestimonials;
