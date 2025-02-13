import SearchComponent from "@/components/search";

export default function Search() {
    return (
        <div className="w-3/5 bg-primary h-screen p-10 border-r-4 border-gray-500 border-dashed">
            <h1 className="text-white text-3xl">Crawler</h1>
            <div className="flex items-center justify-center w-full h-full">
                <SearchComponent />
            </div>
        </div>
    );
}
