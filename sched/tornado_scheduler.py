#-*- coding: utf-8 -*-
from apscheduler.schedulers.tornado import TornadoScheduler
from scheduler_tasts import tick,tick1



class MTornadoScheduler(object):
	def __init__(self):
		self._sched = TornadoScheduler()

		
	def job_start(self):
		self.job_add()
		self._sched.start()


	def job_add(self):
		self._sched.add_job(tick, 'interval', seconds=3)
		self._sched.add_job(tick1, 'interval', seconds=10)




