# Generated by Django 3.0.8 on 2020-08-14 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jangbogo', '0002_auto_20200814_1028'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='pur_expire_period',
            field=models.IntegerField(default=12, verbose_name='유통기한'),
        ),
    ]