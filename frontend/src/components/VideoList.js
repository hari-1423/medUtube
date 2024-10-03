import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'; // Import ReactPlayer

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch videos based on current page and search term
    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/videos', {
                params: {
                    page: currentPage,
                    limit: 12, // Limit to 12 videos per page
                    search: searchTerm,
                },
            });
            setVideos(response.data.videos);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Fetch videos whenever page or search term changes
    useEffect(() => {
        fetchVideos();
    }, [currentPage, searchTerm]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    // Handle pagination (previous/next)
    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            {/* Search Box */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: '300px', padding: '10px', margin: '20px auto', display: 'block' }} // Style for search box
            />

            {/* Video Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h2>{video.title}</h2>
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${video.videoId}`}
                                controls={true} // Show controls like play/pause, volume
                                width='100%'
                                height='200px' // Height of the video player
                            />
                            <p>{video.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No videos available</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                    style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                    Previous
                </button>
                <span style={{ alignSelf: 'center' }}>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                    style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default VideoList;
