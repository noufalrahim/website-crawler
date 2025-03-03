/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import { BASEURL } from "@/constants/appConstants";

export default function SearchComponent() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState<{ data: any } | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchResp() {
        if (!url.trim()) {
            console.warn("Please enter a valid URL.");
            return;
        }

        setLoading(true); // Start loading
        setResult(null);  // Clear previous results

        try {
            const response = await fetch(
                `${BASEURL}/pagespeed/?url=${encodeURIComponent(url)}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.data);
            setResult(data);
        } catch (error) {
            console.error("An error occurred while fetching responses:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return (
        <div className="px-[10rem] w-full flex items-center justify-center flex-col gap-5">
            <p className="text-white text-lg font-semibold">Type in your website URL to analyze its performance</p>
            <Input
                className={cn(
                    "outline-none border-none focus:ring-0 focus:outline-none bg-white text-black px-4 py-2 rounded-md w-full max-w-lg"
                )}
                placeholder="Enter URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button 
                variant="default" 
                className="bg-black hover:bg-black/40 min-w-32 py-5"
                onClick={fetchResp}
                disabled={loading} // Disable button while loading
            >
                {loading ? "Analyzing..." : "Analyze"}
            </Button>

            {/* Display loading indicator */}
            {loading && <p className="text-white mt-3 animate-pulse">Fetching data, please wait...</p>}

            {/* Display result if available */}
            {result && !loading && (
                <div className="bg-gray-800 text-white mt-5 p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h3 className="text-xl font-bold mb-3">Analysis Result</h3>
                    <p><strong>URL:</strong> {result?.data.url}</p>
                    <p><strong>Timestamp:</strong> {new Date(result.data.timestamp).toLocaleString()}</p>
                    <hr className="my-3 border-gray-600" />

                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>CLS Score:</strong> {result.data["cumulative_layout_shift"]}</p>
                        <p><strong>FCP:</strong> {result.data["first_contentful_paint"]}</p>
                        <p><strong>Server Response Time:</strong> {result.data["server_response_time"]}</p>
                        <p><strong>Total Blocking Time:</strong> {result.data["total_blocking_time"]}</p>
                        <p><strong>Speed Index:</strong> {result.data["speed_index"]}</p>
                        <p><strong>TTI:</strong> {result.data["time_to_interactive"]}</p>
                        <p><strong>FMP:</strong> {result.data["first_meaningful_paint"]}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
