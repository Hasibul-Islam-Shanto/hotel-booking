"use client"
import {loggedInNavbarPopupElements} from "@/utils/navbar-popup-elements";
import Link from "next/link";
import {signOut} from "next-auth/react";

type PropsType = {
    setIsPopupOpen: (value: boolean) => void
}
const PopupElementWithLogin = ({setIsPopupOpen}: PropsType) => {

    return (
        <>
            <ul className="">
                {loggedInNavbarPopupElements.map((element) => (
                    <Link key={element.id} href={element.url} className="w-full">
                        <li
                            onClick={() => setIsPopupOpen(false)}
                            className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                        >
                            {element.title}
                        </li>
                    </Link>
                ))}
                <li
                    onClick={() => {
                        signOut({callbackUrl: "/signin"})
                    }}
                    className="px-3 py-2 text-sm cursor-pointer text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                >
                    Logout
                </li>
            </ul>
        </>
    )
}
export default PopupElementWithLogin
