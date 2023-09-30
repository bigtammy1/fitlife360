#!/usr/bin/env python3
"""Flask engine"""

from models import storage
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from os import getenv
from views import app_views

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.register_blueprint(app_views)


@app.teardown_appcontext
def teardown_db(exception):
    """teardown"""
    storage.close()


@app.route('/', strict_slashes=False)
def index() -> str:
    """index route"""
    return 'FitLife360'


@app.errorhandler(401)
def unauthorized(error):
    """ 401 Error
    ---
    responses:
      401:
        description: Unauthorized request
    """
    return make_response(jsonify({'error': "Unauthorized"}), 401)


@app.errorhandler(403)
def forbidden(error):
    """ 403 Error
    ---
    responses:
      403:
        description: Forbidden request
    """
    return make_response(jsonify({'error': "Forbidden"}), 403)


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


# app.run(
#     host=getenv('HOST', '0.0.0.0'), port=int(getenv('PORT', '5000')),
#     load_dotenv=True, threaded=True
# )
