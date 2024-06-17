# Generated by Django 5.0.6 on 2024-06-16 02:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('tsk_id', models.AutoField(primary_key=True, serialize=False)),
                ('tsk_title', models.CharField(max_length=255)),
                ('tsk_desc', models.CharField(blank=True, max_length=255)),
                ('tsk_status', models.IntegerField()),
                ('tsk_creation_date', models.DateTimeField()),
                ('tsk_due_date', models.DateTimeField()),
                ('usr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'tasks',
            },
        ),
    ]