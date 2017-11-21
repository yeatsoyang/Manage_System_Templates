#!/usr/bin/python
# -*- coding: utf-8 -*-

import os, sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)




def query_all_users(_db):
    sql = "select * from user "
    rows = _db.query(sql)
    return rows
