from flask import Blueprint
app_views = Blueprint(
    name='app_views',
    import_name=__name__,
    url_prefix='/api')

from .user import *
from .instructor import *
from .auth import *
from .classes import *
