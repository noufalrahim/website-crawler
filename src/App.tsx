import { useState } from "react";
import RecentSection from "./pages/home/section/recent";
import Search from "./pages/home/section/search";
import WebReport from "./pages/reports";

export default function App() {
  const [renderItem, setRenderItem] = useState('search');
  const [matchUrl, setMatchUrl] = useState();
  return (
    <div className="flex flex-row">
      {
        renderItem === 'search' ? (
          <>
            <Search />
            <RecentSection 
              setRenderItem={setRenderItem}
              setMatchUrl={setMatchUrl}
            />
          </>
        ) : (
          <WebReport matchUrl={matchUrl}/>
        )
      }
      {/*  */}
    </div>
  )
}