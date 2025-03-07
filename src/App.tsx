import { useState, useEffect } from "react";
import { Menu, X, Home, File, BarChart } from "lucide-react";
import Search from "@/pages/home/section/search";
import RecentSection from "@/pages/home/section/recent";
import WebReport from "@/pages/reports";
import GoogleAnalytics from "./pages/googleAnalytics";

export default function App() {
    const [isOpen, setIsOpen] = useState(true);
    const [renderItem, setRenderItem] = useState("home");
    const [matchUrl, setMatchUrl] = useState<string | undefined>(undefined);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <div className="flex w-full bg-primary min-h-screen">
            <div
                className={`fixed top-0 left-0 bg-gray-900 text-white transition-all duration-300 flex flex-col z-50 min-h-screen 
                ${isOpen ? (isMobile ? "w-64 shadow-lg" : "w-64") : (isMobile ? "w-0" : "w-16")}
                ${isMobile ? "absolute" : "relative"}`}
            >
                <div className="flex items-center justify-between p-4">
                    <span className={`text-lg font-bold ${!isOpen && "hidden"}`}>Sidebar</span>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className="flex flex-col space-y-4 p-4">
                    <NavItem icon={<Home size={20} />} text="Home" isOpen={isOpen} onClick={() => { setRenderItem("home"); if (isMobile) setIsOpen(false); }} />
                    <NavItem icon={<File size={20} />} text="Recent Searches" isOpen={isOpen} onClick={() => { setRenderItem("recent_searches"); if (isMobile) setIsOpen(false); }} />
                    <NavItem icon={<BarChart size={20} />} text="Analytics" isOpen={isOpen} onClick={() => { setRenderItem("google_analytics"); if (isMobile) setIsOpen(false); }} />
                </nav>
            </div>

            {isMobile && isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
            )}

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
    );
}
