from flask import request, make_response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Resource, fields, Namespace

from models import Playlist, Video

playlists_videos_ns = Namespace('playlists_videos', description='views namescpace for playlists and videos')

playlist_model = playlists_videos_ns.model(
    "Playlist",
    {
        "id": fields.Integer(),
        "name": fields.String(required=True, description="Playlist name"),
        "image_file": fields.String(description="Image file name"),
        "user_id": fields.Integer(required=True, description="The ID of the user who owns the playlist")
    }
)

# Model serializer for videos
video_model = playlists_videos_ns.model(
    "Video",
    {
        "id": fields.Integer(),
        "title": fields.String(required=True, description="Video title"),
        "url": fields.String(required=True, description="Video URL")
    }
)


# Hello World endpoint
@playlists_videos_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


# Playlists resource
@playlists_videos_ns.route('/playlists')
class PlaylistsResource(Resource):

    @playlists_videos_ns.marshal_list_with(playlist_model)
    def get(self):
        """ Get all playlists """
        playlists = Playlist.query.all()
        return playlists

    @playlists_videos_ns.expect(playlist_model)
    @playlists_videos_ns.marshal_with(playlist_model)
    @jwt_required()
    def post(self):
        """ Create a new playlist """
        user_id = get_jwt_identity()
        data = request.get_json()

        new_playlist = Playlist(
            name=data.get('name'),
            image_file=data.get('image_file'),
            user_id=user_id
        )

        new_playlist.save()
        return new_playlist, 201


# Single playlist resource
@playlists_videos_ns.route('/playlist/<int:id>')
class PlaylistResource(Resource):

    @playlists_videos_ns.marshal_with(playlist_model)
    def get(self, id):
        """ Get a playlist by id """
        playlist = Playlist.query.get_or_404(id)
        return make_response(playlist, 200)

    @playlists_videos_ns.expect(playlist_model)
    @playlists_videos_ns.marshal_with(playlist_model)
    @jwt_required()
    def put(self, id):
        """ Update a playlist by id """
        playlist_to_update = Playlist.query.get_or_404(id)
        data = request.get_json()

        playlist_to_update.update(
            name=data.get('name'),
            image_file=data.get('image_file')
        )

        return playlist_to_update, 200

    @playlists_videos_ns.marshal_with(playlist_model)
    @jwt_required()
    def delete(self, id):
        """ Delete a playlist by id """
        playlist = Playlist.query.get_or_404(id)
        playlist.delete()
        return {'message': 'Playlist deleted successfully'}, 204


@playlists_videos_ns.route('/playlist/<int:playlist_id>/videos')
class PlaylistVideosResource(Resource):

    @playlists_videos_ns.marshal_list_with(video_model)
    def get(self, playlist_id):
        """ Get all videos in a playlist """
        playlist = Playlist.query.get_or_404(playlist_id)
        return playlist.videos, 200

    @playlists_videos_ns.expect(video_model)
    @playlists_videos_ns.marshal_with(video_model)
    @jwt_required()
    def post(self, playlist_id):
        """ Add a new video to a playlist """
        data = request.get_json()
        new_video = Video(
            title=data.get('title'),
            url=data.get('url'),
            playlist_id=playlist_id
        )
        new_video.save()
        return new_video, 201


@playlists_videos_ns.route('/playlist/<int:playlist_id>/video/<int:video_id>')
class PlaylistVideoResource(Resource):

    @playlists_videos_ns.marshal_with(video_model)
    def get(self, playlist_id, video_id):
        """ Get a specific video in a playlist by id """
        video = Video.query.filter_by(id=video_id, playlist_id=playlist_id).first_or_404()
        return video, 200

    @playlists_videos_ns.expect(video_model)
    @playlists_videos_ns.marshal_with(video_model)
    @jwt_required()
    def put(self, playlist_id, video_id):
        """ Update a video in a playlist """
        video_to_update = Video.query.filter_by(id=video_id, playlist_id=playlist_id).first_or_404()
        data = request.get_json()
        video_to_update.update(
            title=data.get('title'),
            url=data.get('url')
        )
        return video_to_update, 201

    @jwt_required()
    def delete(self, playlist_id, video_id):
        """ Delete a video from a playlist """
        video = Video.query.filter_by(id=video_id, playlist_id=playlist_id).first_or_404()
        video.delete()
        return {'message': 'Video deleted successfully'}, 204
