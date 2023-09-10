#!/usr/bin/env python3
"""Flask engine"""

from flask import Flask, jsonify
from os import getenv

app = Flask(__name__)

@app.route('/', strict_slashes=False)
def index() -> str:
    """index route"""
    return jsonify({'message': 'FitLife360'})

app.run(
    host=getenv('HOST') or '0.0.0.0', port=getenv('PORT') or 5000,
    debug=True, load_dotenv=True
)
