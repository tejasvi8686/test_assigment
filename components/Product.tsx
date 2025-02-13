import React from "react";
import Image from "next/image";
import { Products } from "@/constant/data";

const Product = () => {
  return (
    <main className="bg-white flex flex-col items-center justify-center mx-auto">
      <p className="text-black font-light text-[56px] mt-[120px] mb-[50px]">
        Quality Products
      </p>
      <p className="max-w-[700px] text-[#7A7777] font-[400] text-[24px] text-center mb-[100px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="flex flex-row items-center justify-center overflow-x-auto">
        <div className="flex flex-row space-x-4">
          {Products.map((product, index) => (
            <Image
              key={index}
              src={product.image}
              alt="Product"
              className={`w-[434px] h-[610px] object-cover rounded-[20px] ${
                index === 1 ? "scale-110" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Product;
