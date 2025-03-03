import { useState } from "react";
import { Menu, X, Home, Settings, File, BarChart } from "lucide-react";
import Search from "@/pages/home/section/search";
import RecentSection from "@/pages/home/section/recent";
import WebReport from "@/pages/reports";
import GoogleAnalytics from "@/pages/googleAnalytics";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [renderItem, setRenderItem] = useState("home");
    const [matchUrl, setMatchUrl] = useState();

    const renderContent = () => {
        switch (renderItem) {
            case "home":
                return <Search />;
            case "recent_searches":
                return <RecentSection setRenderItem={setRenderItem} setMatchUrl={setMatchUrl} />;
            case "report":
                return <WebReport matchUrl={matchUrl} />;
            case "google_analytics": 
                return <GoogleAnalytics />;
            default:
                return null;
        }
    };

    return (
        <div className="flex w-full">
            <div
                className={`${isOpen ? "w-64" : "w-16"
                    } h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col`}
            >
                <div className="flex items-center justify-between p-4">
                    <span className={`text-lg font-bold ${!isOpen && "hidden"}`}>Sidebar</span>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className="flex flex-col space-y-4 p-4">
                    <NavItem icon={<Home size={20} />} text="Home" isOpen={isOpen} onClick={() => setRenderItem("home")} />
                    <NavItem icon={<File size={20} />} text="Recent Searches" isOpen={isOpen} onClick={() => setRenderItem("recent_searches")} />
                    <NavItem icon={<BarChart size={20} />} text="Analytics" isOpen={isOpen} onClick={() => setRenderItem("google_analytics")} />
                </nav>
            </div>
            <div className="flex-grow">{renderContent()}</div>
        </div>
    );
}

function NavItem({ icon, text, isOpen, onClick }: { icon: React.ReactNode; text: string; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={onClick}>
            {icon}
            {isOpen && <span>{text}</span>}
        </div>
    )
}