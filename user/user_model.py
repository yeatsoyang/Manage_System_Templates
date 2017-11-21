#!/usr/bin/python
# -*- coding: utf-8 -*-

import os, sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)



class User(object):
    user_name = ''
    password = ''
    mobile = ''
    _email = ''
    user_status = ''
    creat_time = ''

    def __init__(self):
        pass
       

    def query_user(self,db,**kw):
        sql = "select * from user where 1=1 "
        for eachK in kw.keys():
            if kw[eachK] is not None: 
                sql = sql + " and " + eachK + " = '" + kw[eachK] + "'"
        rows = db.query(sql)
        return rows


        


