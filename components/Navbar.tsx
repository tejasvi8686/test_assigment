"use client";
import React from "react";
import Image from "next/image";
import { NavItems } from "@/constant/data";
import { Arrow, Hamburger } from "@/assets";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex sm:py-[32px] py-[24px] absolute bg-white z-20 top-0 left-0 right-0 mx-auto sm:w-[97%] w-full sm:pl-[39px] px-[24px] sm:pr-[33px] sm:mt-[21px] mt-[0px]">
      <main className="flex sm:flex-row flex-row-reverse justify-between items-center w-full">
        <div className="md:hidden">
          <Image
            src={Hamburger}
            alt="hamburger menu"
            className="w-[48px] h-[48px]"
          />
        </div>
        <section className="hidden md:flex flex-row gap-[20px]">
          {NavItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="text-black font-[400] text-[14px]"
            >
              {item.name}
            </Link>
          ))}
        </section>

        <section className="border bg-[#FFFCFA] border-black flex flex-row gap-[16px] px-[18px] py-[8px] items-center">
          <span className="text-[#221F20] font-[400] text-[14px]">Contact Us</span>
          <Image src={Arrow} alt="contact us" className="w-[18px] h-[14px]" />
        </section>
      </main>
    </header>
  );
};

export default Navbar;
