import { GetPastResponses } from "@/api/getPastResponses";
import TableComponent from "@/components/table";
import { useEffect, useState } from "react";

export default function RecentSection({setRenderItem}: any) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respData = await GetPastResponses();
                console.log(respData);
                setData(respData.past_searches);
            } catch (error) {
                console.error("Error fetching past responses:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-2/5 bg-primary h-screen p-10">
            <p className="text-white text-xl">Recent Analyses</p>
            <div className="py-10 flex w-full h-full justify-center items-start">
                <TableComponent 
                    columns={[
                        {
                            key: 'url',
                            label: 'Web URL'
                        },
                        {
                            key: 'Time To Interactive',
                            label: 'Response Time'
                        }
                    ]}
                    data={data.length ? data : []}
                    itemsPerPage={10}
                    setRenderItem={setRenderItem}
                />
            </div>
        </div>
    );
};
