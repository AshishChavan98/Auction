from django.db import models
from django.db import models
from django.utils import timezone
# Create your models here.

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    #ext = filename.split('.')[-1]
    return '{0}/{1}'.format(instance.pk,filename)

class Product(models.Model):
    itemname=models.CharField(null=False,max_length=200)
    description=models.CharField(null=False,max_length=200)
    image = models.ImageField(upload_to=user_directory_path,default="bg3.jpg")
    initialbid=models.IntegerField(null=False)
    createddate=models.DateTimeField(default=timezone.now,null=False)
    owner= models.ForeignKey('auth.User',on_delete=models.CASCADE)
    #status = ['ongoing','closed','cancelled']
    status = models.IntegerField(default=0)
    buyer= models.CharField(blank=True,null=True,max_length=200)
    bid=models.IntegerField(default=0,blank=True)

    def __str__(self):
        return self.itemname    