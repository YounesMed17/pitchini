import { FunctionComponent } from "react";

interface Login1Props {
  title: string;
  description: string;
  imageUrl: string;
}

const Login1: FunctionComponent<Login1Props> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col items-center justify-center center">
      <h1 className="ml-[90px] m-0 self-stretch h-[100px]  text-inherit font-semibold font-inherit !bg-clip-text [background:linear-gradient(99.26deg,_#000)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0 [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000] mq450:text-6xl text-[22px]">
        {title}
      </h1>
      <div className="ml-[160px] mt-[-45px] self-stretch flex flex-row items-center justify-center pt-0 px-[30px] pb-[42px] box-border text-6xl mq700:pb-[27px] mq700:box-border">
        <div className="flex-1 flex flex-col items-center justify-center gap-[19px] ">
          <div className="self-stretch relative leading-[37px] font-medium mq450:text-xl mq450:leading-[19px]">
            {description}
          </div>
          <div className=" ml-[80px] self-stretch flex flex-row items-center justify-center  box-border w-[400px]">
            <img
              className=" flex-1 "
              loading="lazy"
              alt=""
              src={imageUrl}
              style={{ width: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;
