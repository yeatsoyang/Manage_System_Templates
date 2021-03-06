﻿# -*- coding: utf-8 -*-

import os
import sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)

from flask import Blueprint, request, redirect, abort,session
from flask import make_response, render_template,jsonify

from db import db_conn,db_func
import user_model

user_bp = Blueprint('user', __name__, template_folder='templates')



@user_bp.route('/query_login_user',methods=['GET','POST'])
def query_login_user():
    _db = db_conn.get_tconn()
    userC = user_model.User()
    rs =  userC.query_user(_db,
                           user_name="yeats",
                           password="00-12-asd-121")
    db_conn.close_tconn(_db)
    return jsonify(rs)




@user_bp.route('/update_user',methods=['GET','POST'])
def update_user():
    _db = db_conn.get_tconn()
    userC = user_model.User()
    flag =  userC.update_user(_db,
                           {'user_name':'shit1',
                            'password':'12345677'},
                           user_id="11")
    if flag:
        db_conn.db_commit(_db)
    db_conn.close_tconn(_db)
    return jsonify({'flag':flag})





@user_bp.route('/delete_user',methods=['GET','POST'])
def delete_user():
    _db = db_conn.get_tconn()
    userC = user_model.User()
    flag =  userC.delete_users(_db,
                           user_id="10",user_name="66")
    if flag>0:
        db_conn.db_commit(_db)
    db_conn.close_tconn(_db)
    return jsonify({'flag':flag})
