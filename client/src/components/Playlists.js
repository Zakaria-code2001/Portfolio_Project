import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BASEURL from './config';

const PlaylistsPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [playlists, setPlaylists] = useState([]);
    const [showModal, setShowModal] = useState({ show: false, type: 'create', id: null });
    const [playlistToDelete, setPlaylistToDelete] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = () => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.sub;

        fetch(`${BASEURL}/playlist_video/playlists?user_id=${user_id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Fetched playlists:', data);
                setPlaylists(data);
            })
            .catch(err => console.error('Error fetching playlists:', err));
    };

    const closeModal = () => {
        setShowModal({ show: false, type: 'create', id: null });
    };

    const showDeleteConfirmModal = (id) => {
        setPlaylistToDelete(id);
        setShowModal({ show: true, type: 'delete', id: null });
    };

    const handleFormSubmit = (data) => {
        if (showModal.type === 'create') {
            createPlaylist(data);
        } else if (showModal.type === 'update') {
            updatePlaylist(data);
        }
    };

    const deletePlaylist = () => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json',
            }
        };

        fetch(`${BASEURL}/playlist_video/playlist/${playlistToDelete}`, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Playlist deleted successfully:', data);
                fetchPlaylists();
                closeModal();
                history.push('/');
            })
            .catch(err => console.error('Error deleting playlist:', err));
    };

    const createPlaylist = (data) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.sub;

        const requestData = {
            ...data,
            user_id: user_id
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        fetch(`${BASEURL}/playlist_video/playlists`, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Playlist created successfully:', data);
                reset();
                fetchPlaylists();
            })
            .catch(err => {
                console.error('There was a problem creating the playlist:', err);
                if (err.response) {
                    err.response.json().then(responseBody => console.log('Response Body:', responseBody));
                } else {
                    console.log('No response received from the server');
                }
            });
    };

    const updatePlaylist = (data) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.sub;

        const requestData = {
            ...data,
            user_id: user_id
        };

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        };

        fetch(`${BASEURL}/playlist_video/playlist/${showModal.id}`, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Playlist updated successfully:', data);
                reset();
                fetchPlaylists();
                closeModal();
            })
            .catch(err => console.error('Error updating playlist:', err));
    };

    return (
        <div className="container">
            <h1>Playlists</h1>
            <Button variant="success" onClick={() => showModal(null, 'create')}>
                Create Playlist
            </Button>
            <div className="playlist-container">
                {playlists.map(playlist => (
                    <Card key={playlist.id} className="playlist">
                        <Card.Body>
                            <Card.Title>{playlist.name}</Card.Title>
                            <Link to={`/playlist/${playlist.id}/videos`}>
                                {playlist.image_file && (
                                    <img src={playlist.image_file} alt={playlist.name} className="small-image" />
                                )}
                            </Link>
                            <Button variant="warning" onClick={() => showModal(playlist.id, 'update')}>
                                Edit
                            </Button>
                            <Button variant='danger' onClick={() => showDeleteConfirmModal(playlist.id)}>
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
    
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'create' ? 'Create Playlist' : 'Update Playlist'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(modalType === 'create' ? createPlaylist : updatePlaylist)}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('name', { required: true, maxLength: 25 })}
                            />
                            {errors.name && <p style={{ color: 'red' }}><small>Name is required</small></p>}
                            {errors.name?.type === "maxLength" && <p style={{ color: 'red' }}>
                                <small>Title should be less than 25 characters</small>
                            </p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('image_file', { required: true, maxLength: 255 })}
                            />
                            {errors.image_file && <p style={{ color: 'red' }}><small>Image is required</small></p>}
                            {errors.image_file?.type === "maxLength" && <p style={{ color: 'red' }}>
                                <small>Description should be less than 255 characters</small>
                            </p>}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>Close</Button>
                            <Button variant="primary" type="submit">Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
    
            <Modal
                show={showDeleteModal}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this playlist?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="danger" onClick={deletePlaylist}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default PlaylistsPage;