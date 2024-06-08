"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

const Input = () => {
    const { data: session } = useSession();

    if (!session) return null;
    return (
        <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
            <img
                src={session.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="w-full divide-y divide-gray-200">
                <textarea
                    placeholder="What's happening"
                    rows="2"
                    className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
                />
                <div className="flex items-center justify-between pt-2.5">
                    <HiOutlinePhotograph className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
                    <button className="bg-blue-400 text-white px-4 py-2 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;
