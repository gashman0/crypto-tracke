import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const SearchBar = () => {
  const [search, setSearch] = useState(''); // for storing the search input value
  const [results, setResults] = useState([]); // for storing the api search result
  const [loading, setLoading] = useState(false); // for tracking loading status
  const [error, setError] = useState(null); // for storing error messages
  const [cache, setCache] = useState({}); // for caching api responses to avoid dublicate request


  const fetchSearchResults = debounce (async (query) => {

    // don't search if query is less than 3 letters
    if (query.length < 3){
      setResults([]); // clears results if query is too short
      return;
    }

    // return cached results if available for this query
    if(cache[query]){
      setResults(cache[query]);
      return;
    }try{
      setLoading(true); // set loading state to true before making the api call
      setError(null); // clear previous errors
      const controller = new AbortController(); // create an abort controller to allow cancelling the request
      const timeoutId = setTimeout(() => controller.abort(), 5000) // set a controller to abort the request if it takes so long (5 seconds)



      // make the api request with the search query
      const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`,
      {signal: controller.signal} // passing the abort signal
      );

      clearTimeout(timeoutId); // clear the timeout since the request has been completed
      if(!response.ok) throw new Error('Omo, Network response was not Ok'); // Throw an error if the response status is not Ok (200-299)
      const data = await response. json();

      setCache(prev => ({ ...prev, [query]: data})); // update the cache with the new results
      setResults(data.coins); // update the results state with the new data
      console.log(data);
    }catch(err){
      // dont show errors if the request was intentionally aborted
      if(err.name !== 'Abort Error'){
        setError(err.message);
      }
    }finally{
      // set loading to false when the request is complete
      setLoading(false);
    }

  }, 3000); // wait three seconds after typing stops before executing


  // useEffect hook to trigger the search when search changes
  useEffect(() => {
    fetchSearchResults(search); // call the debounced search function

    // cleanup function to cancel any pending debounced calls
    return () => fetchSearchResults.cancel();
  }, [search]); // Only rerun when search changes


  return (
    <>
        <div className="search-bar">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a coin..." 
              aria-label="Search input" // Accessibility label
            />

            {/* Error message display */}
            {error && (
              <div className="error" role="alert">
                Error: {error}
              </div>
            )}
            
            {/* Loading state */}
            {loading ? (
              <div className="loader" aria-busy="true">
                Loading...
              </div>
            ) : (
              /* Results list */
              <ul className="results">
                {results.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            )}
            
            {/* No results message */}
            {loading && results.length === 0 && search.length > 2 && (
              <div className="no-results">
                No results found for "{search}"
              </div>
            )}
        </div>
    </>
  )
}

export default SearchBar