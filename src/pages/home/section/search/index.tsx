import SearchComponent from "@/components/search";

export default function Search() {
    return (
        <div className="w-full bg-primary p-10 h-full">
            <p className="text-white text-xl">Digital Presence Analyzer</p>
            
            <div className="flex items-center justify-center w-full h-full">
                <SearchComponent />
            </div>
        </div>
    );
}
