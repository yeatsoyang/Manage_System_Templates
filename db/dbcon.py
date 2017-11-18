# -*- coding: utf-8 -*-
import MySQLdb
import torndb
import traceback

mysql_conf = {
    'host':'127.0.0.1',
    'user':'root',
    'pass':'123456',
    'db':'antd'
}


def get_mysql_conn():
    db = MySQLdb.connect(host=mysql_conf['host'],
                         user=mysql_conf['user'],
                         passwd=mysql_conf['pass'],
                         db=mysql_conf['db'])
    return db



def get_tconn():
    db = torndb.Connection(mysql_conf['host'],
                           mysql_conf['db'],
                           mysql_conf['user'],
                           mysql_conf['pass'])
    return db


