from main import create_app
from config import DevConfig

if __name__ == '__main__':
    """
    Application Runner

    This script initializes and runs the Flask application using the development configuration.
    """
    app = create_app(DevConfig)
    app.run(debug=True)
