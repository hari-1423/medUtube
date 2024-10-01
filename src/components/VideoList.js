import React from 'react';
import YouTube from 'react-youtube';

const VideoList = ({ videos }) => {
  const opts = {
    height: '200',
    width: '300',
  };

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.videoId} className="video-item">
          <YouTube videoId={video.videoId} opts={opts} />
          <p>{video.title}</p>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
