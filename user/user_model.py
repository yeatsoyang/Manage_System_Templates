#!/usr/bin/python
# -*- coding: utf-8 -*-

import os, sys

_dir = os.path.dirname(os.path.abspath(__file__))
_updir = os.path.abspath(os.path.join(_dir, '..'))
if _updir not in sys.path:
    sys.path.insert(0, _updir)
from db import paginator



class User(object):
    def __init__(self):
        self.user_id = None
        self.user_name = None
        self.password = None
        self.mobile = None
        self._email = None
        self.user_status = None
        self.role_ids = []
       

    #  查询单个用户信息
    def query_user(self,db,**kw):
        sql = "select * from user where 1=1 "
        for eachK in kw.keys():
            if kw[eachK] is not None: 
                sql = sql + " and " + eachK + " = '" + kw[eachK] + "'"
        rows = db.query(sql)
        if len(rows) == 0: return {}
        # 获取用户角色
        user_roles = self.query_user_roles(db,rows[0]['user_id'])
        rows[0]['user_roles'] = user_roles
        # 获取用户组
        user_groups = self.query_user_groups(db,rows[0]['user_id'])
        rows[0]['user_groups'] = user_groups
        return rows[0]



    # 查询用户角色信息
    def query_user_roles(self,db,user_id):
        sql = " select t.* from role t,user_role t1 "\
              " where t1.user_id =%s "\
              " and t1.role_id = t.role_id "%(user_id)
        rows = db.query(sql)
        return rows


    # 查询用户组信息
    def query_user_groups(self,db,user_id):
        sql = " select t.* from groups t,user_group t1 "\
              " where t1.user_id =%s "\
              " and t1.group_id = t.group_id "%(user_id)
        rows = db.query(sql)
        return rows




    # 分页查询用户信息
    def query_users(self,db,**kw):
        page = paginator.Paginator('user_id')
        page.setAttr(1)
        pg = page.getAttr()
        sql = "select * from user where 1=1 "
        for eachK in kw.keys():
            if kw[eachK] is not None: 
                sql = sql + " and " + eachK + " = '" + kw[eachK] + "'"
        rows = db.query_pagination(sql,pg)
        return rows



    # 查询所有用户信息
    def query_all_users(self,db,**kw):
        sql = "select * from user where 1=1 "
        for eachK in kw.keys():
            if kw[eachK] is not None: 
                sql = sql + " and " + eachK + " = '" + kw[eachK] + "'"
        rows = db.query(sql)
        return rows




    # 修改用户信息
    def update_user(self,db,user_d,**kw):
        sql = "update user set "
        user_d_list = [(key,user_d[key]) for key in user_d]
        parameters_list = [(eachK,kw[eachK]) for eachK in kw.keys()]
        sql = self.sql_build(sql,user_d_list,parameters_list)
        lastrowid = db.execute(sql)
        if lastrowid>=0:
            return True
        return False




    # 拼接sql
    def sql_build(self,sql,u_list,p_list):
        # 拼装修改字段
        if len(u_list)!=0:
            for i in range(0,len(u_list)):
                if i == len(u_list)-1:
                    sql = sql + ""+str(u_list[i][0])+"" +\
                          "=" + "'"+u_list[i][1]+"'"
                else:
                    sql = sql + ""+str(u_list[i][0])+"" +\
                          "=" + "'"+u_list[i][1]+"',"
        # 拼装修改条件
        if len(p_list)!=0:
            for i in range(0,len(p_list)):
                if i == 0:
                    sql = sql + " where "
                    if p_list[i][1] is not None: 
                        sql = sql + p_list[i][0] + " ='"+\
                        p_list[i][1] + "'"
                else:
                    if p_list[i][1] is not None: 
                        sql = sql +" and " + p_list[i][0] +\
                        " ='" + p_list[i][1] + "'"
        return sql



    def delete_users(self,db,**kw):
        sql = "delete from user "
        parameters_list = [(eachK,kw[eachK]) for eachK in kw.keys()]
        sql = self.sql_build(sql,[],parameters_list)
        lastrowid = db.execute(sql)
        if lastrowid>=0:
            return True
        return False


