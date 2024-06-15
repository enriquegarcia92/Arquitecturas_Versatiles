# Generated by Django 4.1.13 on 2024-06-15 16:29

import bson.objectid
import django.contrib.auth.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, default=bson.objectid.ObjectId, primary_key=True, serialize=False)),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('usr_name', models.CharField(blank=True, max_length=255)),
                ('username', models.CharField(blank=True, max_length=255, null=True)),
                ('usr_email', models.CharField(max_length=255, unique=True)),
                ('usr_password', models.CharField(max_length=255)),
                ('usr_role', models.CharField(max_length=10)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
                ('is_superuser', models.BooleanField(blank=True, default=False, null=True)),
                ('first_name', models.CharField(blank=True, max_length=255, null=True)),
                ('last_name', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('is_staff', models.BooleanField(blank=True, default=False, null=True)),
                ('is_active', models.BooleanField(blank=True, default=True, null=True)),
                ('date_joined', models.DateTimeField(null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'user',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
