import React, { useEffect, useState } from 'react';
import List from './components/List';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10; // Display 10 items per page

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Implement filtering based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Implement pagination buttons
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  async function fetchApi() {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&from=2023-08-23&sortBy=publishedAt&apiKey=88d76c684c58455d96797c8235a152f9`
      );
      const newData = response.data.articles;
      setData(newData);
      console.log(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-semibold mb-4">API Integration App</h1>
    <SearchBar onSearch={handleSearch} />
    <div className="mt-4">
      <List data={paginatedData} keyword={searchQuery} />
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  </div>
  );
};

export default App;
