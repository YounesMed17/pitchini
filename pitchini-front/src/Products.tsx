import SideBar from "./components/SideBar";
import ProductCard from "./components/productCard";

export default function Products() {
  return (
    <div className="flex gap-[80px] justify-center items-center">
      <SideBar></SideBar>
      <div className="mt-[200px]">
        <h2 className="m-0 self-stretch relative md:text-[28px] ml-[15px] text-[20px] font-semibold font-inherit text-orange mt-[-2px]">
          Choose products to order with you Pitchini coins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
