import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import GroupComponent1 from "./GroupComponent1";

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

const FrameComponent1: FunctionComponent<{ user: UserData | null }> = ({
  user,
}) => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/job-fiche");
  }, [navigate]);

  return (
    <div className=" self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[10.2px] box-border max-w-full text-right text-base-9 text-gray-1600 font-titre-grey">
      <div
        className="flex-1 flex flex-row items-start justify-start max-w-full cursor-pointer"
        onClick={onGroupContainerClick}
      >
        <GroupComponent1 user={user} />
      </div>
    </div>
  );
};

export default FrameComponent1;
