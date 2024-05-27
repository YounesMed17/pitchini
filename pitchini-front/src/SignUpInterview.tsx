import { FunctionComponent } from "react";
import EnTete from "./components/EnTete";
import { useLocation } from "react-router-dom";

const RecruiterInterview: FunctionComponent = () => {
  const location = useLocation();
  const { first_name, last_name } = location.state;

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-center justify-start pt-0 px-4 pb-[39px] box-border tracking-normal text-center text-base-4 text-gray-3 font-join-text">
      <main className="self-stretch flex flex-col items-center justify-center shrink-0">
        <EnTete />
        <section className="w-full flex flex-col items-center justify-center py-4 px-4 box-border max-w-full text-center text-xl text-darkgray-400 font-join-text">
          <img
            className="w-[450px] max-w-full mb-6"
            loading="lazy"
            alt=""
            src="/2201-1@2x.png"
          />
          <div className="w-full flex flex-col items-center justify-center px-4 max-w-full">
            <h1 className="text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 mb-6">
              <p>
                Hello {first_name} {last_name},
              </p>
              <p>
                To complete the confirmation of your account, please proceed
                with a video interview.
              </p>
            </h1>
            <h2 className="text-lg leading-snug mb-6">
              <p>
                <span className="font-medium">
                  You will receive an email containing the interview date and
                  the meeting link.
                </span>
                <i className="font-medium"> See you soon!</i>
              </p>
            </h2>
            <div className="w-full text-base text-gray-3 mt-6">
              <div className="font-medium">Copyright © PITCHINI 2024</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecruiterInterview;
