#coding=utf-8
#!/usr/bin/python
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.web import Application, FallbackHandler
import tornado.options

from app import flaskapp
from sched.tornado_scheduler import MTornadoScheduler
from ws.websocket import WSHandler

# 启动定时任务
#mt = MTornadoScheduler()
#mt.job_start()


if __name__ == '__main__':
	wapp = WSGIContainer(flaskapp)
	application = Application([
		(r'/ws', WSHandler),
		(r".*", FallbackHandler, dict(fallback=wapp)),
	])
	tornado.options.options.logging = "debug"

	#http_server = HTTPServer(WSGIContainer(flaskapp))
	application.listen(7000)  #flask默认的端口
	IOLoop.instance().start()