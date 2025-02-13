import React from "react";
import Image from "next/image";
import { NavItems } from "@/constant/data";
import { Arrow } from "@/assets";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-black w-full mx-auto rounded-full flex px-6 py-4">
      <main className="flex justify-between items-center w-full">
        {/* Left Navigation */}
        <section className="flex items-center gap-4">
          {NavItems.map((item) => (
            <Link href={item.link} key={item.id} className="text-white text-2xl">
              {item.name}
            </Link>
          ))}
        </section>

        {/* Contact Section */}
        <section className="border border-white p-2 rounded-lg flex items-center gap-2 cursor-pointer">
          <span className="text-white">Contact Us</span>
          <Image src={Arrow} alt="contact us" width={18} height={14} />
        </section>
      </main>
    </header>
  );
};

export default Navbar;
