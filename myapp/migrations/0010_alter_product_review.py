# Generated by Django 5.2 on 2025-05-09 16:12

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0009_rename_name_user_first_name_remove_cartitem_image_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='review',
        ),
        migrations.AddField(
            model_name='product',
            name='review',
            field=models.JSONField(blank=True, default=list),
        ),
    ]

