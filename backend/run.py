from app import app
from os import getenv

app.run(
    host=getenv('HOST', '0.0.0.0'), port=int(getenv('PORT', '5000')),
    load_dotenv=True, threaded=True, debug=True
)
