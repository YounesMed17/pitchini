import { ChangeEvent, FunctionComponent, useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";

import InputComponent from "./Input";
import SignInWithGoogleContainer from "./SignInWithGoogleContainer";
import "./Conversation.css";
import Footer from "./Footer";
import Footer1 from "./Footer1";
interface CopyrightPitchiniProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin?: () => void;
  errorMessage: string;
  setErrorMessage: (error: string) => void;
  number: number;
  setNumber: (number: number) => void;
}

const CopyrightPitchini: FunctionComponent<CopyrightPitchiniProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  errorMessage,
  setErrorMessage,
  number,
  setNumber,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onGoogleFormInputClick = useCallback(() => {}, []);

  const onSIGNINTextClick = useCallback(() => {
    // Please sync "Dashboard " to the project
  }, []);

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/forget-password");
  }, [navigate]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="self-stretch flex flex-col justify-center items-center  gap-[44px] max-w-full text-center text-xl text-white font-titre-grey mq700:gap-[22px_44px]">
      <div className="self-stretch flex flex-col justify-center items-center  gap-[22.5px] font-montserrat p-30px">
        {/* input email */}
        <div className="flex flex-col space-y-10 pb-11 justify-center items-center ">
          <InputComponent
            type="email"
            placeholder="Enter your email"
            value={email}
            handleInputChange={handleEmailChange}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            number={number}
            setNumber={setNumber}
            setHasError={setHasError}
            hasError={number === 1 || number === 2}
          />
          {/* input password */}
          <InputComponent
            type="password"
            placeholder="Enter your password"
            value={password}
            handleInputChange={handlePasswordChange}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            number={number}
            setNumber={setNumber}
            setHasError={setHasError}
            hasError={number === 1 || number === 3}
          />
        </div>
        {/* Affichage du message d'erreur */}
        {errorMessage === "Email and password are required" && number == 1 && (
          <div className="text-red-500">{errorMessage}</div>
        )}
        {/* input checkbox */}
      </div>
      <div className="self-stretch flex flex-row items-start justify-center pt-0 pb-[17.100000000000364px] pr-[21px] pl-5 box-border max-w-full text-5xl text-dodgerblue-200">
        <div className="w-[639px] flex flex-col items-end justify-start gap-[36.80000000000109px] max-w-full mq700:gap-[18px_36.8px]">
          <SignInWithGoogleContainer
            handleLogin={handleLogin}
            onGoogleFormInputClick={onGoogleFormInputClick}
            onSIGNINTextClick={onSIGNINTextClick}
          />
          <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[54px] pl-14 box-border max-w-full mq700:pl-7 mq700:pr-[27px] mq700:box-border">
            <div className="flex-1 flex flex-col items-start justify-start gap-[7.200000000000728px] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div
                  className="w-[301px] relative [text-decoration:underline] font-medium inline-block shrink-0 cursor-pointer mq450:text-lgi"
                  onClick={onForgotPasswordTextClick}
                >
                  Forgot password?
                </div>
              </div>
              <div className="self-stretch relative [text-decoration:underline] font-medium mq450:text-lgi">
                Don’t have an account ? Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default CopyrightPitchini;
