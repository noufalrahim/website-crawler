import SearchComponent from "@/components/search";

export default function Search() {
    return (
        <div className="w-full bg-primary h-screen p-10">
            <h1 className="text-white text-3xl">Crawler</h1>
            <div className="flex items-center justify-center w-full h-full">
                <SearchComponent />
            </div>
        </div>
    );
}
