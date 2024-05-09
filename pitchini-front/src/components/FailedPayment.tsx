import SideBar from "./SideBar";

export default function FailedPayment() {
  return (
    <div>
      <SideBar></SideBar>
      <div className=" flex flex-col text-center text-orange">
        <h1>Failed Payment</h1>
        <h1>Please use another card or contact your bank</h1>
      </div>
    </div>
  );
}
