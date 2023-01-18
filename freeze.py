from flask_frozen import Freezer
from app import app


if __name__ == '__main__':
    app.config["FREEZER_BASE_URL"] = "https://hthelander.github.io/Project-3/"
    freezer = Freezer(app)
    freezer.freeze()
