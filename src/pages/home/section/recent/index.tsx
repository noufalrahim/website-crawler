import { GetPastResponses } from "@/api/getPastResponses";
import { PagespeedDataType } from "@/components/search/types";
import TableComponent from "@/components/table";
import { useEffect, useState } from "react";

interface RecentSectionProps {
    setRenderItem: (renderItem: string) => void;
    setMatchUrl: (matchUrl: string | undefined) => void;
}

export default function RecentSection({ setRenderItem, setMatchUrl }: RecentSectionProps) {
    const [data, setData] = useState<PagespeedDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const respData = await GetPastResponses();
                console.log(respData);

                // Corrected type structure
                const filteredData: PagespeedDataType[] = respData.past_searches
                    .filter((item: { search_type: string }) => item.search_type === "PageSpeed Insights")
                    .flatMap((item: { data: PagespeedDataType[] }) => item.data);
                
                setData(filteredData);
            } catch (error) {
                console.error("Error fetching past responses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full p-10">
            <p className="text-white text-xl">Recent Analyses</p>
            <div className="py-10 flex w-full h-full justify-center items-start">
                {loading ? (
                    <p className="text-white text-xl text-center animate-pulse">Loading...</p>
                ) : (
                    <TableComponent
                        columns={[
                            { key: 'url', label: 'Web URL' },
                            { key: 'time_to_interactive', label: 'Response Time' }
                        ]}
                        data={data}
                        itemsPerPage={10}
                        setRenderItem={setRenderItem}
                        setMatchUrl={setMatchUrl}
                    />
                )}
            </div>
        </div>
    );
}
