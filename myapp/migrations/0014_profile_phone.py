# Generated by Django 5.2 on 2025-05-13 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0013_alter_profile_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='phone',
            field=models.CharField(default='1234567891', max_length=15, unique=True),
        ),
    ]
