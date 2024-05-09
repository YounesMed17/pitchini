import SideBar from "./SideBar";

export default function SuccessfulPayment() {
  return (
    <div>
      <SideBar></SideBar>
      <div className=" flex flex-col text-center text-orange">
        <h1>Your Payment Has Successfully Transfered</h1>
        <h1>Thank You For Your Trust</h1>
      </div>
    </div>
  );
}
