#!/usr/bin/python
# -*- coding: utf-8 -*-

import os, sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)
from db import paginator



class Role(object):
    def __init__(self):
        pass


    def query_role_menus(self,db,role_ids):
        role_sids = ','.join(role_ids)
        sql = " select menu_id from role_menu t "\
              " where t.role_id in ( %s ) "%(role_sids)
        rows = db.query(sql)
        menu_ids = set([int(r['menu_id']) for r in rows])
        return menu_ids

