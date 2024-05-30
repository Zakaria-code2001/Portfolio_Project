// VideosPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VideosPage = () => {
  const { playlist_id } = useParams(); // Get the playlist_id parameter from the URL
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`/playlist_video/playlist/${playlist_id}/videos`)
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, [playlist_id]); // Fetch videos whenever playlist_id changes

  return (
    <div>
      <h1>Videos</h1>
      <div className="video-container">
        {videos.map(video => (
          <div key={video.id} className="video">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            {/* Render video content */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;