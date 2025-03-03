/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetPastResponses } from "@/api/getPastResponses";
import TableComponent from "@/components/table";
import { useEffect, useState } from "react";

export default function WebReport({ matchUrl }: any) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const respData = await GetPastResponses();
                console.log(respData);
                const filteredData = respData.past_searches
                .filter((item: any) => item.search_type === "PageSpeed Insights")
                .map((item: any) => item.data); 
                // const filteredData = respData.past_searches.filter(
                //     (item: any) => item.url === matchUrl
                // );

                const reqData = filteredData.filter((item: any) => item.url === matchUrl);

                setData(reqData);
            } catch (error) {
                console.error("Error fetching past responses:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [matchUrl]);

    return (
        <div className="min-h-screen bg-primary w-full items-start flex px-10 py-20 flex-col">
            <h1 className="text-white text-3xl">Crawler</h1>
            <div className="w-full h-full py-10">
                {loading ? (
                    <p className="text-white text-xl text-center">Loading...</p>
                ) : data.length > 0 ? (
                    <TableComponent
                        columns={[
                            { key: 'timestamp', label: 'Date' },
                            { key: 'url', label: 'Web URL' },
                            { key: 'cumulative_layout_shift', label: 'Cumulative Layout Shift Score' },
                            { key: 'first_contentful_paint', label: 'First Contentful Paint (Crux)' },
                            { key: 'estimated_input_latency', label: 'Estimated Input Latency' },
                            { key: 'total_blocking_time', label: 'Total Blocking Time' },
                            { key: 'speed_index', label: 'Speed Index' },
                            { key: 'time_to_interactive', label: 'Time To Interactive' },
                            { key: 'first_meaningful_paint', label: 'First Meaningful Paint' }
                        ]}
                        data={data}
                        itemsPerPage={10}
                    />
                ) : (
                    <p className="text-white text-xl text-center">No data available.</p>
                )}
            </div>
        </div>
    );
}
