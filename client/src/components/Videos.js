import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'; 
import { Card, Button, Modal,  Form} from 'react-bootstrap';
import BASEURL from "./config";


const VideosPage = () => {
    const { playlist_id } = useParams();
    const [videos, setVideos] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const history = useHistory(); 

    useEffect(() => {
        fetch(`${BASEURL}/playlist_video/playlist/${playlist_id}/videos`)
            .then(response => response.json())
            .then(data => {
                setVideos(data);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    }, [playlist_id]); // Fetch videos whenever playlist_id changes

    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };
    const handleShowDeleteModal = (video) => {
        setVideoToDelete(video);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setVideoToDelete(null);
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
            handleCloseDeleteModal();
            history.push('/');
        })
        .catch(error => {
            console.error('Error deleting video:', error);
        });
    };

    return (
        <div>
            <h1>Videos</h1>
            <Button variant="primary" onClick={handleShowCreateModal}>Create Video</Button>
            <div className="video-container">
                {videos.map(video => (
                    <Card key={video.id} title={video.title} description={video.description}>
                        <VideoPlayer url={video.url} />
                        <Button variant="danger" onClick={() => handleShowDeleteModal(video)}>Delete</Button>
                    </Card>
                ))}
            </div>
            <CreateVideoModal show={showCreateModal} onHide={handleCloseCreateModal} playlistId={playlist_id} />
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this video?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteVideo}>Delete</Button>
                </Modal.Footer>
            </Modal>
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
const CreateVideoModal = ({ show, onHide, playlistId }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleCreate = () => {
        const data = {
            title: title,
            url: url
        };
        // Send data to create video endpoint
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        fetch(`${BASEURL}/playlist_video/playlist/${playlistId}/videos`, {
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
            onHide();
            fetchVideos();
        })
        .catch(error => {
            console.error('Error creating video:', error);
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="url">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text" value={url} onChange={e => setUrl(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleCreate}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VideosPage;
