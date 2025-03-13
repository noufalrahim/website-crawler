/* eslint-disable @typescript-eslint/no-explicit-any */
const TABS = ["Search", "Maps", "Google Business API"];

const SearchResults = ({ results, setActiveTabs, activeTab }: { results: any, setActiveTabs: (tabs: string) => void, activeTab: string }) => {

  console.log(results);

  if (!results || results.length === 0) return null;

  return (
    <div className="bg-gray-800 text-white mt-5 p-6 rounded-lg shadow-lg w-full max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-3">Search Results</h3>

      <div className="flex space-x-4 mb-4 border-b border-gray-600 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-all ${activeTab === tab ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
              }`}
            onClick={() => {
              // fetchData();
              setActiveTabs(tab)
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {
        activeTab === "Search" ? (
          <ul className="space-y-4">
            {results.map((result: any, index: number) => (
              <li key={index} className="p-4 bg-gray-700 rounded-lg shadow">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg font-semibold"
                >
                  {result.title}
                </a>
                <p className="text-gray-300 text-sm mt-1">{result.snippet}</p>
                <p className="text-gray-400 text-xs mt-2">{result.displayLink}</p>
              </li>
            ))}
          </ul>
        ) : activeTab === "Maps" ? (
          (
            <ul className="space-y-4">
              {results.map((result: any, index: number) => (
                <li key={index} className="p-4 bg-gray-700 rounded-lg shadow">
                  <a
                    href={result.icon_mask_base_uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-lg font-semibold"
                  >
                    {result.formatted_address}
                  </a>
                  <p className="text-gray-400 text-xs mt-2">{result.name}</p>
                </li>
              ))}
            </ul>
          )
        ) : (
          <ul className="space-y-4">
            {results.map((result: any, index: number) => (
              <li key={index} className="p-4 bg-gray-700 rounded-lg shadow">
                <a
                  href={result.icon_mask_base_uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg font-semibold"
                >
                  {result.formatted_address}
                </a>
                <p className="text-gray-400 text-xs mt-2">{result.name}</p>
              </li>
            ))}
          </ul>
        )
      }

    </div>
  );
};

export default SearchResults;
