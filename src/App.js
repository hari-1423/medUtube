import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from './components/VideoList';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, [query, currentPage]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/videos?searchQuery=${query}&page=${currentPage}&limit=12`
      );
      setVideos(response.data.videos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handlePagination = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <h1>Video Library</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={handleSearch}
        />
      </div>
      <VideoList videos={videos} />
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePagination(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
