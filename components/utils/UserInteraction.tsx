"use client";
import { useEffect, useRef, useState } from "react";
import { FaLanguage } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import PopupElementWithLogin from "@/components/utils/PopupElementWithLogin";
import PopupElementWithoutLogin from "@/components/utils/PopupElementWithoutLogin";
import { Session } from "next-auth";
import Image from "next/image";

interface PropsType {
  session: Session | null;
}

const UserInteraction = ({ session }: PropsType) => {
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
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              height={30}
              width={30}
              alt="profile-image"
              className="rounded-full"
            />
          ) : !session?.user ? (
            <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
              <FaUser className="text-white" />
            </span>
          ) : (
            <div className="h-8 w-8 font-bold text-lg text-white flex items-center justify-center bg-teal-500 rounded-full">
              {session?.user?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
        </button>

        {isPopupOpen && (
          <div
            ref={popupRef}
            className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 "
          >
            {session?.user ? (
              <PopupElementWithLogin setIsPopupOpen={setIsPopupOpen} />
            ) : (
              <PopupElementWithoutLogin setIsPopupOpen={setIsPopupOpen} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserInteraction;
