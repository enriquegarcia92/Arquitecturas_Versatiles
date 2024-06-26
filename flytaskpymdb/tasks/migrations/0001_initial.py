# Generated by Django 4.1.13 on 2024-06-15 16:29

import bson.objectid
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, default=bson.objectid.ObjectId, primary_key=True, serialize=False)),
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
