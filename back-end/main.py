from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_restx import Api
from flask import Flask
from exts import db
from models import User, Playlist, Video
from views import views_ns
from auth import auth_ns
from flask_cors import CORS


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)
    CORS(app)

    migrate = Migrate(app, db)
    JWTManager(app)
    api = Api(app, doc='/docs')
    api.add_namespace(views_ns)
    api.add_namespace(auth_ns)

    # Shell context for flask shell
    @app.shell_context_processor
    def make_shell_context():
        return dict(db=db, User=User, Playlist=Playlist, Video=Video)

    return app
