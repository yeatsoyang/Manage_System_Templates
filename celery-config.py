#-*- coding: utf-8 -*-
from app import flaskapp

# Celery configuration
flaskapp.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
flaskapp.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

# Initialize Celery
celery = Celery(flaskapp.name, broker=flaskapp.config['CELERY_BROKER_URL'])
celery.conf.update(flaskapp.config)