import { FunctionComponent, useCallback, useEffect, useState } from "react";
import "./ChatOnline.css";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

interface ProjectData {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  deadLine: Date;
  addedFile: boolean;
  requestQuotation: boolean;
  workingPreference: string;
  category: string;
  totalPrice?: number | null;
  finishedDate?: Date | null;
  freelancerId: number;
  clientId: number;
  isPublished: boolean;
  status: string;
}

interface FrameComponentProps {
  projectWork: ProjectData;
  activeTab: number;
  userId: string;
}

const Projet: FunctionComponent<FrameComponentProps> = ({
  activeTab,
  projectWork,
  userId,
}) => {
  const [imageSource, setImageSource] = useState(""); // Utilisez useState pour déclarer imageSource comme une variable d'état
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const projectId = projectWork.id;

  const onSaveClick = useCallback(async () => {
    try {
      // Vérifier si la relation utilisateur-projet existe
      const relationResponse = await fetch(
        `http://localhost:3001/api/userProjectRelation/getproject/${userId}/${projectId}`
      );

      if (relationResponse.ok) {
        // Si la relation existe, supprimer-la
        const deleteResponse = await fetch(
          `http://localhost:3001/api/userProjectRelation/supprimer/${userId}/${projectId}`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete user-project relation");
        }
      } else {
        // Si la relation n'existe pas, ajouter-la
        const addResponse = await fetch(
          `http://localhost:3001/api/userProjectRelation/userProjectsRelation/${userId}/${projectId}`,
          {
            method: "POST",
          }
        );

        if (!addResponse.ok) {
          throw new Error("Failed to add user-project relation");
        }
      }

      // Mettre à jour l'état de l'image en fonction de l'action effectuée
      setImageSource((prevSource) =>
        prevSource === "/image1.png" ? "/heart-3@2x.png" : "/image1.png"
      );
    } catch (error) {
      console.error("Error during request:", error);
    }
  }, [userId, projectId, setImageSource]);

  useEffect(() => {
    const checkRelation = async () => {
      try {
        const relationResponse = await fetch(
          `http://localhost:3001/api/userProjectRelation/getproject/${userId}/${projectId}`
        );

        if (relationResponse.ok) {
          // La relation existe, mettre à jour imageSource
          setImageSource("/image1.png");
        } else {
          setImageSource("/heart-3@2x.png");
        }
      } catch (error) {
        console.error("Error checking relation:", error);
      }
    };

    checkRelation();
  }, [userId, projectId, onSaveClick]);
  const timeDifferenceInMinutes = differenceInMinutes(
    new Date(),
    new Date(projectWork.creationDate)
  );
  const timeDifferenceInHours = differenceInHours(
    new Date(),
    new Date(projectWork.creationDate)
  );
  const timeDifferenceInDays = differenceInDays(
    new Date(),
    new Date(projectWork.creationDate)
  );

  // Convertit la différence de temps en texte
  let timeElapsedText = "";
  if (timeDifferenceInDays > 0) {
    timeElapsedText = `${timeDifferenceInDays} days ago`;
  } else if (timeDifferenceInHours > 0) {
    timeElapsedText = `${timeDifferenceInHours} hours ago`;
  } else {
    timeElapsedText = `${timeDifferenceInMinutes} minutes ago`;
  }
  const handleProjectClick = () => {
    setSelectedProject(projectWork);
    console.log(projectWork);
    setShowPopup(true);
  };
  async function apply() {
    console.log("aplyyyyyyyyyyy");
    if (!selectedProject) {
      console.error("Selected project is not set");
      return;
    }

    const response = await fetch(`http://localhost:3001/api/notification/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "A freelancer applied for your job",
        userId: selectedProject.clientId,
        freelancerId: userId,
      }),
    });
  }

  return (
    <>
      <div className="self-stretch flex flex-col items-end justify-start pt-0 px-0 pb-[23.7px] box-border gap-[9.8px] max-w-full text-right text-base-9 text-gray-1600 font-titre-grey">
        <div className="w-[192.9px] h-[18.9px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center shrink-0 [debug_commit:f6aba90]">
          Posted {timeElapsedText}
        </div>
        <div className=" self-stretch flex flex-row items-start justify-between pt-[29.4px] pb-[29.5px] pr-[44.5px] pl-[45.3px] relative shrink-0 [debug_commit:f6aba90] text-left text-14xl-2 text-blue mq1050:flex-wrap mq1050:pl-[22px] mq1050:pr-[22px] mq1050:box-border">
          <img
            className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-[27.94px] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/rectangle-3184.svg"
            onClick={() => handleProjectClick()}
          />
          <div className="w-[619.9px] flex flex-col items-start justify-start gap-[23.1px] max-w-full">
            <div className="w-[552px] flex flex-col items-start justify-start gap-[2.3px] max-w-full shrink-0">
              <div className="self-stretch flex flex-row items-start justify-start relative max-w-full shrink-0">
                <div className="flex-1 relative leading-[113%] font-semibold shrink-0 [debug_commit:f6aba90] z-[1] mq450:text-xl mq450:leading-[23px] mq1050:text-8xl mq1050:leading-[30px]">
                  {projectWork.name}
                </div>
              </div>
              <div className="w-[490.8px] h-[27.2px] relative text-base-9 tracking-[-0.01em] leading-[145.45%] font-light text-dimgray-500 flex items-center shrink-0 [debug_commit:f6aba90] z-[1]"></div>
            </div>
            <div className="self-stretch h-[27.2px] relative text-2xl-9 tracking-[-0.01em] leading-[145.45%] font-light text-gray-800 flex items-center shrink-0 z-[1] mq450:text-lg mq450:leading-[25px]">
              {projectWork.description}
            </div>
            <div className="flex flex-row items-end justify-start gap-[17.4px] max-w-full text-base-9 text-dimgray-500 mq750:flex-wrap">
              <img
                className="self-stretch w-[105.7px] relative max-h-full object-cover min-h-[42px] z-[1]"
                alt=""
                src="/103-1-1@2x.png"
              />

              <div className="w-[82.3px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.8px] box-border">
                <div className="self-stretch flex flex-row items-start justify-start gap-[6.8px]">
                  <img
                    className="h-[33.2px] w-[33.2px] relative object-cover z-[1]"
                    alt=""
                    src="/pricetag-1-1@2x.png"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                    <div className="self-stretch h-[27.2px] relative tracking-[-0.01em] leading-[145.45%] font-light flex items-center shrink-0 whitespace-nowrap z-[1]">
                      {projectWork.totalPrice}dt
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start py-0 pr-0 pl-px gap-[95.2px]">
            <img
              className="w-[47.6px] h-[47.6px] relative object-contain z-[1]"
              alt=""
              src={imageSource || "/heart-3@2x.png"}
              onClick={onSaveClick}
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="pop">
          {" "}
          <div className="self-stretch flex-1 flex flex-col items-start justify-start relative gap-[8.3px] max-w-full">
            <div className="w-[624.3px] !m-[0] absolute top-[48.1px] left-[38.2px] flex flex-col items-center justify-start max-w-full z-[1]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[48.2px] max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[24.9px] max-w-full text-mini-9">
                  <div className="w-[549.7px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border max-w-full shrink-0">
                    <div className=" textcolor-blue self-stretch h-[29.1px] relative leading-[113%] font-semibold flex items-center shrink-0">
                      Create a editable template flyer
                    </div>
                    <div className="self-stretch h-[40.1px] relative text-sm-3 tracking-[-0.01em] leading-[145.45%] font-light text-dimgray-800 flex items-center shrink-0">
                      {` Profil: ${selectedProject?.category}| Deadline :${selectedProject?.deadLine}`}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[5px] shrink-0 text-sm-3">
                    <div className="w-[181.8px] relative tracking-[-0.01em] leading-[22.4px] font-medium flex items-center textcolor-blue">
                      Description project{" "}
                    </div>
                    <div className="self-stretch relative text-xs-6 tracking-[-0.01em] leading-[145.45%] font-light text-black text-justify">
                      Edit a flyer that’s been started and allow it to be
                      editable.
                    </div>
                  </div>
                </div>
                <div className="w-[471.6px] flex flex-row flex-wrap items-start justify-start gap-[42.3px] max-w-full text-xs-6">
                  <div className="flex flex-row items-center justify-start gap-[12.5px]">
                    <img
                      className="h-[29.1px] w-[29.9px] relative object-contain"
                      loading="lazy"
                      alt=""
                      src="/pricetag-11@2x.png"
                    />
                    <div className="w-[54px] flex flex-col items-start justify-start py-0 px-0 box-border">
                      <div className=" textcolor-blue h-[22.2px] relative tracking-[-0.01em] leading-[145.45%] flex items-center shrink-0 min-w-[29px] whitespace-nowrap">
                        {`${selectedProject?.totalPrice}dt`}
                      </div>
                      <div className="w-[109.6px] relative text-3xs-1 tracking-[-0.01em] leading-[145.45%] font-light text-dimgray-800 flex items-center mt-[-2.5px]">
                        Fixed-price
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-row items-start justify-start gap-[13.3px] min-w-[216px] max-w-full">
                    <img
                      className="h-[29.1px] w-[29.9px] relative object-contain"
                      loading="lazy"
                      alt=""
                      src="/expert-1@2x.png"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start gap-[3.3px]">
                      <div className=" textcolor-blue w-[94.6px] relative tracking-[-0.01em] leading-[11.6px] flex items-center">
                        {selectedProject?.category}
                      </div>
                      <div className="self-stretch relative text-3xs-1 tracking-[-0.01em] leading-[145.45%] font-light text-dimgray-800 text-justify">{`I am willing to pay higher rates for the most experienced freelancers. `}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[0.1px] box-border gap-[5px] max-w-full">
                  <div className=" textcolor-blue w-[181.8px] h-[24.1px] relative tracking-[-0.01em] leading-[145.45%] font-medium flex items-center shrink-0">
                    Skills and Expertise
                  </div>
                  <div className="flex flex-row items-start justify-start gap-[14.1px]">
                    <button className="cursor-pointer py-1.5 px-5 bg-[transparent] rounded-[4.31px] overflow-hidden flex flex-row items-center justify-center border-[1.2px] border-solid border-dimgray-200 hover:bg-gray-1800 hover:box-border hover:border-[1.2px] hover:border-solid hover:border-gray-300">
                      <div className="relative text-sm-3 tracking-[-0.01em] font-medium font-montserrat text-dimgray-200 text-center inline-block min-w-[120px]">
                        Adobe Photoshop
                      </div>
                    </button>
                    <button className="cursor-pointer py-1.5 px-[17px] bg-[transparent] rounded-[4.31px] overflow-hidden flex flex-row items-center justify-center border-[1.2px] border-solid border-dimgray-200 hover:bg-gray-1800 hover:box-border hover:border-[1.2px] hover:border-solid hover:border-gray-300">
                      <div className="relative text-sm-3 tracking-[-0.01em] font-medium font-montserrat text-dimgray-200 text-center inline-block min-w-[119px]">
                        Adobe Illustrateur
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-[339.6px] flex flex-col items-start justify-start pt-0 px-0 pb-[0.1px] box-border gap-[9.1px] max-w-full">
                  <div className=" textcolor-blue w-[181.8px] relative tracking-[-0.01em] leading-[145.45%] font-medium flex items-center">
                    About the client
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-between gap-[20px] text-3xs-1 text-dimgray-800">
                    <div className="flex flex-row items-center justify-start py-0 px-0 gap-[6.2px]">
                      <div className="relative tracking-[-0.01em] leading-[145.45%] font-light inline-block min-w-[76px]">
                        Rating
                      </div>
                    </div>
                    <img
                      className="h-[48.3px] w-[58.2px] relative object-contain"
                      loading="lazy"
                      alt=""
                      src="/103-1@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flis">
              <button
                onClick={apply}
                className="cursor-pointer [border:none] p-0 bg-[transparent] w-[114.2px] !m-[0]   flex flex-row items-start justify-start z-[2]"
              >
                <div className="flex-1 overflow-hidden flex flex-row items-start justify-start py-[11px] pr-[13px] pl-4 border-[1.8px] border-solid border-dgrad-color">
                  <div className="relative text-mini-9 tracking-[-0.01em] leading-[18.4px] font-medium font-montserrat text-orange text-center inline-block min-w-[82px]">
                    Apply Now
                  </div>
                </div>
              </button>
              <button
                onClick={onSaveClick}
                className="cursor-pointer [border:none] p-0 bg-[transparent] w-[142px] !m-[0]   flex flex-row items-start justify-start z-[2]"
              >
                <div className="flex-1 overflow-hidden flex flex-row items-end justify-start pt-0.5 pb-[11px] pr-[15px] pl-[18.3px] gap-[8.3px] border-[1.8px] border-solid border-blue">
                  <img
                    className="h-[27.7px] w-[27.7px] relative object-contain z-[1]"
                    alt=""
                    src={imageSource || "/heart-3@2x.png"}
                    onClick={onSaveClick}
                  />
                  <div className="w-[68.9px] flex flex-col items-start justify-end pt-0 px-0 pb-[2.2px] box-border">
                    <div className="self-stretch relative text-mini-9 tracking-[-0.01em] font-medium font-montserrat text-blue text-center inline-block min-w-[68.9px] z-[1]">
                      Save Job
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projet;
