# -*- coding: utf-8 -*-

import os
import sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)

import re
import json
import random
import time,datetime
import hashlib
from flask import Blueprint, request, redirect, abort,session
from flask import make_response, render_template,jsonify

from db import db_conn,db_func
import idx_model

idx_bp = Blueprint('idx', __name__, template_folder='templates')



@idx_bp.route('/get_idx',methods=['GET','POST'])
def get_idx():
    _db = db_conn.get_tconn()
    rs =  idx_model.query_all_users(_db)
    db_conn.close_tconn(_db)
    return jsonify(rs)

