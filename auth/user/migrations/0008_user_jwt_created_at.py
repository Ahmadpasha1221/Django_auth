# Generated by Django 5.0.2 on 2024-08-26 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_user_otp_code_delete_otptoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='jwt_created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
