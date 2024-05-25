from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_restx import Api
from flask import Flask
from exts import db
from models import User, Playlist, Video
from playlists_videos import playlists_videos_ns
from auth import auth_ns


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)
    api = Api(app, doc='/docs')
    api.add_namespace(playlists_videos_ns)
    api.add_namespace(auth_ns)

    # Shell context for flask shell
    @app.shell_context_processor
    def make_shell_context():
        return dict(db=db, User=User, Playlist=Playlist, Video=Video)

    return app
