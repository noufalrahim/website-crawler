
const SearchResults = ({ results }: {results: any}) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="bg-gray-800 text-white mt-5 p-6 rounded-lg shadow-lg w-full max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-3">Search Results</h3>
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
    </div>
  );
};

export default SearchResults;
