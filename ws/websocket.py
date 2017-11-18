# coding: utf-8
import anyjson as json
from tornado.websocket import WebSocketHandler


class WSHandler(WebSocketHandler):

	clients = set()
	@staticmethod
	def send_to_all(message):
		for c in WSHandler.clients:
			print "cli:"
			print c
			c.write_message(json.dumps(message))


	def open(self):
		self.write_message(json.dumps({
			'type': 'sys',
			'message': 'Welcome to WebSocket',
		}))
		WSHandler.send_to_all({
			'type': 'sys',
			'message': str(id(self)) + ' has joined',
		})
		WSHandler.clients.add(self)



	def on_close(self):
		WSHandler.clients.remove(self)
		WSHandler.send_to_all({
			'type': 'sys',
			'message': str(id(self)) + ' has left',
		})


	def on_message(self, message):
		WSHandler.send_to_all({
			'type': 'user',
			'id': id(self),
			'message': message,
		})





'''

	def open(self):
		WSHandler.clients.add(self)
		self.write_message(json.dumps({'input': 'connected...'}))
		self.stream.set_nodelay(True)


	def on_message(self, message):
		message = json.loads(message)
		self.write_message(json.dumps({'input': 'response...'}))
		i = 0
		while i <= 10:
			i += 1
			self.write_message(json.dumps(message))
			time.sleep(1)
		# 服务器主动关闭
		#self.close()
		WSHandler.clients.remove(self)


	def on_close(self):
		# 客户端主动关闭
		WSHandler.clients.remove(self)
'''