/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetPastResponses } from "@/api/getPastResponses";
import TableComponent from "@/components/table";
import { useEffect, useState } from "react";

export default function RecentSection({ setRenderItem, setMatchUrl }: any) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respData = await GetPastResponses();
                console.log(respData);
                const filteredData = respData.past_searches
                    .filter((item: any) => item.search_type === "PageSpeed Insights")
                    .map((item: any) => item.data); 
                setData(filteredData);
            } catch (error) {
                console.error("Error fetching past responses:", error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <div className="w-full bg-primary h-screen p-10">
            <p className="text-white text-xl">Recent Analyses</p>
            <div className="py-10 flex w-full h-full justify-center items-start">
                <TableComponent
                    columns={[
                        {
                            key: 'url',
                            label: 'Web URL'
                        },
                        {
                            key: 'time_to_interactive',
                            label: 'Response Time'
                        }
                    ]}
                    data={data.length ? data : []}
                    itemsPerPage={10}
                    setRenderItem={setRenderItem}
                    setMatchUrl={setMatchUrl}
                />
            </div>
        </div>
    );
};
