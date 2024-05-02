import { FunctionComponent } from "react";
interface portfolioServicesProps {
  domains: { domain: string }[];
}

const PortfolioServices: FunctionComponent<portfolioServicesProps> = ({
  domains,
}) => {
  return (
    <div className=" mb-[70px] flex flex-col items-center justify-start gap-[55px] max-w-full text-center text-mini text-dimgray-1000 font-titre-grey mq750:gap-[27px]">
      <div className="w-[835px] flex flex-col items-center justify-start max-w-full mq450:gap-[15px] mq1050:gap-[31px]">
        <div className="self-stretch flex flex-col items-center justify-start gap-[8px] max-w-full">
          <div className="w-[499px] flex flex-col items-center justify-start max-w-full">
            <div className="w-[169px] relative leading-[22px] uppercase font-medium inline-block">
              Service
            </div>
            <h1 className="m-0 self-stretch h-[53px] relative text-21xl font-semibold font-inherit text-orange inline-block shrink-0 [text-shadow:0.7px_0_0_rgba(0,_0,_0,_0),_0_0.7px_0_rgba(0,_0,_0,_0),_-0.7px_0_0_rgba(0,_0,_0,_0),_0_-0.7px_0_rgba(0,_0,_0,_0)] mq450:text-5xl mq1050:text-13xl">
              What I Need
            </h1>
          </div>
          <div className="self-stretch relative text-sm leading-[21px] text-grey2">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo orci odio, ut bus sed. `}</div>
        </div>
      </div>
      <div className="self-stretch  py-0 pr-[0.1px] pl-0 gap-[23px] text-lgi text-orange flex justify-center items-center flex-col md:flex-row  ">
        {domains.map((item, index) => (
          <div
            key={index}
            className=" rounded-9xl bg-white overflow-hidden flex flex-col items-center justify-center pt-[18px] px-[23px] pb-[25px] box-border"
          >
            <div className="self-stretch flex-1 flex flex-col items-center justify-center gap-[6px]">
              <img
                className="self-stretch flex-1 w-[140px]  max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/icon04-1@2x.png"
              />
              <div className="w-[170px] h-7  leading-[105%] uppercase font-medium inline-block shrink-0">
                {item.domain}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioServices;
