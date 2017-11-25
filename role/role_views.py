# -*- coding: utf-8 -*-

import os
import sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)

from flask import Blueprint, request, redirect, abort,session
from flask import make_response, render_template,jsonify

from db import db_conn,db_func
import role_model

role_bp = Blueprint('role', __name__, template_folder='templates')

