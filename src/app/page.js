import Input from "@/components/Input";

export default function Home() {
    return (
        <div className="max-w-xl border-x min-h-screen mx-auto">
            <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
                <h1 className="text-lg sm:text-xl font-bold">Home</h1>
            </div>
            <Input />
        </div>
    );
}
