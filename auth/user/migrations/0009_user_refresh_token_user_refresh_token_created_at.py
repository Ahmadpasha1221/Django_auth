# Generated by Django 5.0.2 on 2024-08-27 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_user_jwt_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='refresh_token',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='refresh_token_created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
