from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auction.settings')

app = Celery('auction')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
app.conf.beat_schedule = {
    'add-every-minute-contrab': {
        'task': 'scheduled_operation',
        'schedule': crontab(),
        'args': (16, 16),
    },
   
}
#minute='*/15'
@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
