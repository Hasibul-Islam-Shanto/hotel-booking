"use client";
import { useEffect, useRef, useState } from "react";
import { FaLanguage } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { navbarPopupElements } from "@/utils/navbar-popup-elements";
import Link from "next/link";

const UserInteraction = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="flex items-center space-x-4 relative justify-end">
        <button>
          <FaLanguage className="text-zinc-700 text-3xl" />
        </button>
        <button
          ref={buttonRef}
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
        >
          <FaBars />
          <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
            <FaUser className="text-white" />
          </span>
        </button>

        {isPopupOpen && (
          <div
            ref={popupRef}
            className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 "
          >
            <ul className="">
              {navbarPopupElements.map((element) => (
                <Link key={element.id} href={element.url} className="w-full">
                  <li
                    onClick={() => setIsPopupOpen(false)}
                    className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                  >
                    {element.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInteraction;
