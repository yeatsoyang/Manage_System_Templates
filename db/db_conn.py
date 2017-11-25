# -*- coding: utf-8 -*-
import db_func

db_conf_ini = {
    'host':'127.0.0.1',
    'user':'root',
    'pass':'123456',
    'db':'sys_manage'
}


def get_tconn():
    db=db_func.Connection(host=db_conf_ini['host'],
              database=db_conf_ini['db'],
              user=db_conf_ini['user'],
              password=db_conf_ini['pass'])
    return db



def close_tconn(db):
    db.close()




def db_commit(db):
    db.commit()