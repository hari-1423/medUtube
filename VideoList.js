import React from "react";

const VideoList = ({ videos }) => {
    return (
        <div>
            {videos.map((video) => (
                <div key={video.id.videoId} className="video">
                    <h3>{video.snippet.title}</h3>
                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    <p>{video.snippet.description}</p>
                    <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                        Watch
                    </a>
                </div>
            ))}
        </div>
    );
};

export default VideoList;
