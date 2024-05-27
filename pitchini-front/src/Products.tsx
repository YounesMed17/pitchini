import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { get } from "./utilFunctions/getData";
import ProductCard from "./components/productCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  link: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/products/all");
      const values = await res;

      const products = values.map((item: any) => ({
        id: item.id,
        name: item.productLabel,
        description: item.productDescription,
        price: item.price,
        stock: item.stock,
        link: item.link,
      }));

      setProducts(products);
    }

    fetchData();
  }, []);

  return (
    <div className="flex gap-[40px] justify-center items-center">
      <SideBar />
      <div className="mt-[150px] ml-[-40px]">
        <h2 className="m-0 self-stretch relative md:text-[28px] ml-[15px] text-[20px] font-semibold font-inherit text-orange mt-[-2px]">
          Choose products to order with your Pitchini coins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
          {products
            .filter((product) => product.stock > 0)
            .map((product) => (
              <ProductCard
                key={product.id}
                userId={10}
                productId={product.id}
                image={product.link} // You might want to make the image dynamic
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          {products
            .filter((product) => product.stock > 0)
            .map((product) => (
              <ProductCard
                key={product.id}
                userId={3}
                productId={product.id}
                image={product.link} // You might want to make the image dynamic
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          {products
            .filter((product) => product.stock > 0)
            .map((product) => (
              <ProductCard
                key={product.id}
                userId={3}
                productId={product.id}
                image={product.link} // You might want to make the image dynamic
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          {products
            .filter((product) => product.stock > 0)
            .map((product) => (
              <ProductCard
                key={product.id}
                userId={3}
                productId={product.id}
                image={product.link} // You might want to make the image dynamic
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          {products
            .filter((product) => product.stock > 0)
            .map((product) => (
              <ProductCard
                key={product.id}
                userId={3}
                productId={product.id}
                image={product.link} // You might want to make the image dynamic
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          {products
            .filter((product) => product.stock > 0)
            .map((product) => (
              <ProductCard
                key={product.id}
                userId={3}
                productId={product.id}
                image={product.link} // You might want to make the image dynamic
                title={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
