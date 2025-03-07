import { GetPastResponses } from "@/api/getPastResponses";
import TableComponent from "@/components/table";
import { useEffect, useState } from "react";
import { PagespeedDataType } from "@/components/search/types";

interface WebReportProps {
    matchUrl: string | undefined;
}

export default function WebReport({ matchUrl }: WebReportProps) {
    const [data, setData] = useState<PagespeedDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const respData = await GetPastResponses();
                console.log(respData);

                // Flatten and filter the data properly
                const filteredData: PagespeedDataType[] = respData.past_searches
                    .filter((item: { search_type: string }) => item.search_type === "PageSpeed Insights")
                    .flatMap((item: { data: PagespeedDataType[] }) => item.data);

                const reqData = filteredData.filter((item) => item.url === matchUrl);

                setData(reqData);
            } catch (error) {
                console.error("Error fetching past responses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [matchUrl]);

    return (
        <div className="w-full py-16 lg:px-10 md:px-10 xl:px-10">
            <p className="text-white text-xl px-5 md:px-0 lg:px-0 xl:px-0">Recent Analyses</p>
            <div className="py-10 flex w-full justify-center items-start">
                {loading ? (
                    <p className="text-white text-xl text-center animate-pulse">Loading...</p>
                ) : data.length > 0 ? (
                    <div className="w-[25rem] lg:w-full xl:w-full overflow-x-auto">
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
                    </div>
                ) : (
                    <p className="text-white text-xl text-center">No data available.</p>
                )}
            </div>
        </div>
    );
}
