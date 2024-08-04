from django.db import models

# Create your models here.
class Contact(models.Model):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    surname = models.CharField(max_length=50)
    email = models.EmailField()
    contact_number = models.CharField(max_length=15)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.first_name} {self.middle_name or ""} {self.surname}'
    
class Portfolio(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web Development'),
        ('mobile', 'Mobile Development'),
        ('design', 'Design'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    date_start = models.DateField()
    date_finish = models.DateField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    link = models.URLField(blank=True, null=True)
    image1 = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)
    image2 = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)
    image3 = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)
    image4 = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)
    image5 = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)

    def __str__(self):
        return self.title