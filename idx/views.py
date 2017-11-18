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

from db import dbcon

idx_bp = Blueprint('idx', __name__, template_folder='templates')



@idx_bp.route('/add_idx',methods=['GET','POST'])
def add_idx():
    '''
    db = dbcon.get_mysql_conn()
    cursor =db.cursor()
    '''
    db = dbcon.get_tconn()
    sql = "select * from user"
    rows = db.query(sql)
    print rows
    return jsonify(rows)

