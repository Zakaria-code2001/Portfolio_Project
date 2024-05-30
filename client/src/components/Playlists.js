import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PlaylistsPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = () => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.sub;

        fetch(`/playlist_video/playlists?user_id=${user_id}`, {
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

    const createPlaylist = (data) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        console.log("Token:", token);
    
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const user_id = decodedToken.sub;
    
        const requestData = {
            ...data,
            user_id: user_id
        };
    
        console.log("Request Data:", requestData);
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(requestData)
        };
    
        console.log("Request Options:", requestOptions);
    
        fetch('/playlist_video/playlists', requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Playlist created successfully:', data);
                reset();
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

    return (
        <div className="container">
            <h1>Playlists</h1>
            <div className="playlist-container">
      {playlists.map(playlist => (
        <Card key={playlist.id} className="playlist">
          <Card.Body>
            <Card.Title>{playlist.name}</Card.Title>
            {/* Wrap the entire card with Link */}
            <Link to={`/playlist/${playlist.id}`}>
              {playlist.image_file && (
                <img src={playlist.image_file} alt={playlist.name} className="small-image" />
              )}
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>


            <h1>Create A Playlist</h1>
            <form onSubmit={handleSubmit(createPlaylist)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" {...register('name', { required: true, maxLength: 25 })} />
                    {errors.name && <p style={{ color: 'red' }}><small>Name is required</small></p>}
                    {errors.name?.type === "maxLength" && <p style={{ color: 'red' }}>
                        <small>Title should be less than 25 characters</small>
                    </p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" {...register('image_file', { required: true, maxLength: 255 })} />
                    {errors.image_file && <p style={{ color: 'red' }}><small>Image is required</small></p>}
                    {errors.image_file?.type === "maxLength" && <p style={{ color: 'red' }}>
                        <small>Description should be less than 255 characters</small>
                    </p>}
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </form>
        </div>
    );
};

export default PlaylistsPage;
