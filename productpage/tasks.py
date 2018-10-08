from __future__ import absolute_import, unicode_literals
import random
from celery.decorators import task
from .models import Product


@task(name="scheduled_operation")
def op(x, y):
    Product.objects.filter(buyer=None).delete()
    Product.objects.filter(status=0).update(status=1)
    return 

#celery commands
#celery -A auction worker -l info
#celery -A auction beat -l info