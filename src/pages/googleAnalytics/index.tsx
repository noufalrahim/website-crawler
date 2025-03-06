import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import SearchResults from '@/components/analyticsResult'
import { BASEURL } from '@/constants/appConstants'

export default function GoogleAnalytics() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [responseData, setResponseData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${BASEURL}/search/?query=${search}`,
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
            setResponseData(data.results);
        }
        catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full bg-primary h-screen p-10">
            <p className="text-white text-xl">Google Analyses</p>
            <div className='items-center flex flex-row justify-start py-5 gap-5'>
                <Input
                    className={cn(
                        "outline-none border-none focus:ring-0 focus:outline-none bg-white text-black px-4 py-5 rounded-md w-full max-w-lg"
                    )}
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    variant="default"
                    className="bg-black hover:bg-black/40 min-w-32 py-5"
                    onClick={fetchData}
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze"}
                </Button>
            </div>
            <SearchResults results={responseData} />
        </div>
    )
}
