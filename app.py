#-*- coding: utf-8 -*-
import os, sys ,json ,urllib,re
from flask import Flask, redirect, request,render_template
from flask import make_response,session,abort,url_for,jsonify

app_startup_dir = os.path.dirname(os.path.abspath(__file__))

if app_startup_dir not in sys.path:
    sys.path.append(app_startup_dir)

os.environ['_ROOTPATH_'] = app_startup_dir
os.environ['_UPLOAD_FOLDER_'] = os.path.join(app_startup_dir,'static','upload_file')


flaskapp = Flask(__name__, template_folder='templates')
flaskapp.debug = True
flaskapp.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

from db import db_conn,db_func
from role import role_model


blueprints = (
    ('idx.idx_views.idx_bp', '/idx'),
    ('user.user_views.user_bp', '/user'),
    ('role.role_views.role_bp', '/role'),
)


#蓝图
for mod_path, mount_point in blueprints:
    parts = mod_path.split('.')
    print parts
    _path = '.'.join(parts[:-1])
    bp_name = parts[-1]
    mod = __import__(_path, None, None, [bp_name], -1)
    bp = getattr(mod, bp_name)
    flaskapp.register_blueprint(bp, url_prefix=mount_point)




@flaskapp.route('/')
def homePage():
    return render_template('login.html')



@flaskapp.route('/index')
def idx():
    return render_template('index.html')



@flaskapp.route('/get_menus',methods=['GET','POST'])
def get_menus():
    role = role_model.Role()
    _db = db_conn.get_tconn()
    from utils.conf import Menus 
    menus = Menus['menus']
    role_ids = ['1']
    menu_list = role.query_role_menus(_db,role_ids)
    for menu in menus:
        c = []
        for sub_menus in menu['children']:
            if int(sub_menus['key']) in menu_list:
               c.append(sub_menus)
        menu['children'] = c
    return jsonify(menus)
    #return json.dumps(menus,ensure_ascii=False)







@flaskapp.route('/dt.json')
def dt_json():
    return jsonify({'item': 'yeatsoyang', 'echo_msg': 'successful'}),



@flaskapp.route('/test_post',methods=['GET','POST'])
def test_post():
    return jsonify({'item': 'post', 'echo_msg': 'successful'}),









def _run_paste():
    host = ('0.0.0.0', 7000)
    from paste import httpserver
    _app = flaskapp
    _app.debug = True
    httpserver.serve(_app.wsgi_app, host=host[0], port=host[1])


if __name__ == '__main__':
    port = 7000
    _argv = sys.argv[1:]
    if _argv and _argv[0].isdigit():
        port = int(_argv[0])
    if len(sys.argv) >= 2 and sys.argv[1] == 'paste':
        _run_paste()
    else:
        host = ('0.0.0.0', port)    
        flaskapp.run(host=host[0], port=host[1], debug=True)
