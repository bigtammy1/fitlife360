from flask import Blueprint
app_views = Blueprint(name='app_views', import_name=__name__, url_prefix='/api')


from .auth import *
from .instructor_auth import *
from .user_auth import *