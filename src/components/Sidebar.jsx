"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter(); // Initialize router

  const Menus = [
    { title: "Overview", src: "Overview", path: "/" },
    { title: "Subtitles", src: "Transactions", path: "/subtitles" }, // Corrected path
    { title: "Gallery", src: "Card", gap: true, path: "/gallery" },
    { title: "Voiceover", src: "Calendar", path: "/voiceover" },
    { title: "AI Chat", src: "Debt", path: "/chat" },
    { title: "Personal Details", src: "Legal", path: "/personal-info" },
    { title: "Home", src: "Notifications", gap: true, path: "/home" },
    { title: "Account Settings", src: "Settings", gap: true, path: "/settings" },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-black h-screen p-5 pt-8 relative duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <img
        src="/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      {/* Sidebar Content */}
      <div className="flex gap-x-4 items-center">
        <img
          src="/assets/Overview.svg"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Script Scout
        </h1>
      </div>
      <ul className="pt-6 flex flex-col justify-between flex-grow">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            onClick={() => router.push(Menu.path)} // Navigate to the specified path
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            <img src={`/assets/${Menu.src}.svg`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
