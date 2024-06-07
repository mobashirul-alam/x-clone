"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiDotsHorizontal, HiHome } from "react-icons/hi";

const Sidebar = () => {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col p-3 justify-between h-screen">
            <div className="flex flex-col gap-4 p-3">
                <Link href={"/"}>
                    <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
                </Link>
                <Link
                    href={"/"}
                    className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
                >
                    <HiHome className="w-7 h-7" />
                    <span className="font-bold hidden lg:inline">Home</span>
                </Link>
                {session ? (
                    <button
                        onClick={() => signOut()}
                        className="bg-blue-400 text-white font-semibold rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden lg:inline"
                    >
                        Sign Out
                    </button>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="bg-blue-400 text-white font-semibold rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden lg:inline"
                    >
                        Sign In
                    </button>
                )}
            </div>
            {session && (
                <div className="text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200">
                    <img
                        src={session.user.image}
                        alt="user"
                        className="w-10 h-10 rounded-full lg:mr-2"
                    />
                    <div className="hidden lg:inline">
                        <h4 className="font-bold">{session.user.name}</h4>
                        <p className="text-gray-500">{session.user.username}</p>
                    </div>
                    <HiDotsHorizontal className="h-5 lg:ml-8 hidden lg:inline" />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
