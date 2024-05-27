import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
interface UserData {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  rates?: number;
  creationDate: Date;
  strikesNbr: number;
  status: string;
  nickname?: string;
  role: string;
  resetToken?: string;
  tokenExpiration?: Date;
}
const GroupComponent1: FunctionComponent<{ user: UserData | null }> = ({
  user,
}) => {
  const navigate = useNavigate();
  const [leftNav, setLeftNav] = useState([
    {
      imagePath: "/image.png", // Chemin de l'image par défaut
      text: " Dashboard", // Texte par défaut
    },
    {
      imagePath: "/portfolio-1096059-1@2x.png", // Chemin de l'image par défaut
      text: "Portfolio", // Texte par défaut
    },
    {
      imagePath: "/102-1@2x.png", // Chemin de l'image par défaut
      text: " Find Work", // Texte par défaut
    },
    {
      imagePath: "/inbox-1@2x.png", // Chemin de l'image par défaut
      text: "Inbox", // Texte par défaut
    },
    {
      imagePath: "/groupe-1@2x.png", // Chemin de l'image par défaut
      text: "Contact", // Texte par défaut
    },
    {
      imagePath: "/path-8-1@2x.png", // Chemin de l'image par défaut
      text: "Settings", // Texte par défaut
    },
    {
      imagePath: "/-icon-account-login.svg", // Chemin de l'image par défaut
      text: "Log Out", // Texte par défaut
    },
  ]);

  const onGroupContainer2Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="w-[380.6px] flex flex-col items-start justify-start pt-12 pb-[506.3px] pr-[41.6px] pl-[46.8px] box-border relative gap-[229.6px] shrink-0 text-left text-xl-4 text-gray-200 font-titre-grey lg:pt-[31px] lg:pb-[329px] lg:box-border mq450:gap-[115px_229.6px] mq450:pl-5 mq450:pr-5 mq450:pb-[139px] mq450:box-border mq750:pt-5 mq750:pb-[214px] mq750:box-border">
      <img
        className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/rectangle-3190.svg"
      />
      <div className="self-stretch flex flex-col items-end justify-start gap-[58.3px] text-center text-17xl-2 mq450:gap-[29px_58.3px]">
        <img
          className="w-[31.7px] h-[32.6px] relative object-contain z-[1]"
          loading="lazy"
          alt=""
          src="/group-513113@2x.png"
        />
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[34px] pl-0">
          <div className="h-[283.9px] flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[102.7px] box-border gap-[26.5px] z-[1] mq450:pb-[67px] mq450:box-border">
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[38px] pl-[38.5px]">
              <img
                className="h-[181.2px] w-[181.2px] relative object-cover shrink-0 [debug_commit:f6aba90]"
                loading="lazy"
                alt=""
                src="/image@2x.png"
              />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start shrink-0 [debug_commit:f6aba90]">
              <div className="self-stretch h-[35.5px] relative tracking-[-0.01em] font-semibold flex items-center justify-center shrink-0 mq450:text-3xl mq1050:text-10xl">
                {user ? user.first_name : null}
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-8 pl-[-31.7px] mt-[-3.8px] text-lgi-6 text-gray-1600">
                <div className="h-[44.6px] flex-1 relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center justify-center whitespace-nowrap ">
                  {user ? user.email : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[250.8px] flex flex-row items-start justify-start py-0 pr-6 pl-[24.2px] box-border text-gray-1400">
        <div className="flex-1 flex flex-col items-start justify-start gap-[46px] z-[1]">
          {leftNav.map((item, index) => (
            <div
              key={index} // Assurez-vous d'avoir une clé unique pour chaque élément
              className="w-[188px] flex flex-row items-end justify-start gap-[30.2px] cursor-pointer text-gray-1300"
              onClick={onGroupContainer2Click}
            >
              <img
                className="h-[53.6px] w-[43.8px] relative object-cover shrink-0 [debug_commit:f6aba90]"
                loading="lazy"
                alt=""
                src={item.imagePath} // Utilisez le chemin d'image de l'élément actuel
              />
              <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[9px]">
                <div className="self-stretch h-[35.5px] relative font-medium flex items-center shrink-0 [debug_commit:f6aba90] mq450:text-base">
                  {item.text} {/* Utilisez le texte de l'élément actuel */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupComponent1;
