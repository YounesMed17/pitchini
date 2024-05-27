import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login1 from "./components/Login1";
import FrameComponent1 from "./components/FrameComponent1";
import Footer from "./components/Footer";
import FrameComponent11 from "./components/Framecomponent11";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoPitchini1Click = useCallback(() => {
    // Please sync "Home Page" to the project
  }, []);

  const onContactTextClick = useCallback(() => {
    // Please sync "Contact Page " to the project
  }, []);

  const onButtonContainerClick = useCallback(() => {
    // Please sync "Joint Freelancer  p1" to the project
  }, []);

  const onRectangleClick = useCallback(() => {
    navigate("/login-freelancer");
  }, [navigate]);

  const onFreelacerTextClick = useCallback(() => {
    navigate("/login-freelancer");
  }, [navigate]);

  const onRectangle2Click = useCallback(() => {
    navigate("/login-recruiter");
  }, [navigate]);

  const onRecruiterTextClick = useCallback(() => {
    navigate("/login-recruiter");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[39px] box-border gap-[73px] tracking-[normal] mq450:gap-[18px_73px] mq950:gap-[36px_73px]">
      <Navbar
        onLogoPitchini1Click={onLogoPitchini1Click}
        onContactTextClick={onContactTextClick}
        onButtonContainerClick={onButtonContainerClick}
      />
      <main className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5 box-border max-w-full">
        <section className=" flex flex-col items-start justify-start gap-[73px] max-w-full text-center text-66xl text-grey1 font-titre-grey mq700:gap-[18px_73px] mq975:gap-[36px_73px]">
          <Login1
            title="Login the Pitchini"
            description="Are you using PITCHINI as a Recruiter or a Freelancer ?"
            imageUrl="/login02-converti02-1@2x.png"
          />

          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Login;
