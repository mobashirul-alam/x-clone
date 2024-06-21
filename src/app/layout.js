import CommentModal from "@/components/CommentModal";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "X-clone",
    description: "A clone of X website using Next.js and TailwindCSS",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
    return (
        <SessionWrapper>
            <html lang="en">
                <body className={inter.className}>
                    <div className="flex justify-between max-w-7xl mx-auto">
                        <div className="hidden sm:inline border-r h-screen sticky top-0">
                            <Sidebar />
                        </div>
                        <div className="w-2xl flex-1">{children}</div>
                        <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem] sticky top-0">
                            <div className="sticky top-0 bg-white py-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
                                />
                                <News />
                            </div>
                        </div>
                    </div>
                    <CommentModal />
                </body>
            </html>
        </SessionWrapper>
    );
}
