import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import BASEURL from "./config";

const VideosPage = () => {
    const { playlist_id } = useParams();
    const [videos, setVideos] = useState([]);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        fetchVideos();
    }, [playlist_id]);
    
    const fetchVideos = () => {
        fetch(`${BASEURL}/playlist_video/playlist/${playlist_id}/videos`)
            .then(response => response.json())
            .then(data => {
                setPlaylistName(data.playlistName);
                setVideos(data);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    };

    const handleDelete = (video) => {
        setVideoToDelete(video);
        deleteVideo();
    };

    const deleteVideo = () => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        fetch(`${BASEURL}/playlist_video/playlist/${playlist_id}/video/${videoToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Video deleted successfully:', data);
            setVideos(videos.filter(video => video.id !== videoToDelete.id));
            setVideoToDelete(null);
        })
        .catch(error => {
            console.error('Error deleting video:', error);
        });
    };

    const handleCreate = () => {
        const data = {
            title: title,
            url: url
        };
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        fetch(`${BASEURL}/playlist_video/playlist/${playlist_id}/videos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Video created successfully:', data);
            setTitle('');
            setUrl('');
            fetchVideos();
        })
        .catch(error => {
            console.error('Error creating video:', error);
        });
    };

    return (
        <div className="videos-page">
            <h1>{playlistName}</h1>
            <div className="video-container">
                {videos.map(video => (
                    <Card key={video.id} title={video.title} description={video.description} className="video-card">
                        <h2>{video.title}</h2>
                        <div className="video-wrapper">
                            <VideoPlayer url={video.url} />
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDelete(video);
                            window.location.href = 'https://portfolio-project-1-vs55.onrender.com/';
                          }}
                        >
                          Delete
                        </Button>
                    </Card>
                ))}
            </div>
            <Form className="create-video-form">
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="url">
                    <Form.Label>URL</Form.Label>
                    <Form.Control type="text" value={url} onChange={e => setUrl(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleCreate}>Create</Button>
            </Form>
        </div>
    );
};

const VideoPlayer = ({ url }) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = getYouTubeVideoId(url);
        return (
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        );
    } else {
        return <video src={url} controls />;
    }
};

const getYouTubeVideoId = (url) => {
    let videoId = '';
    if (url.includes('youtube.com')) {
        videoId = url.split('v=')[1];
    } else if (url.includes('youtu.be')) {
        videoId = url.split('/').pop();
    }
    return videoId;
};

export default VideosPage;
