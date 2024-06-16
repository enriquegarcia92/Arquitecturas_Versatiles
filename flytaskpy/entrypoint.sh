#!/bin/bash

# Function to check if PostgreSQL is ready
check_postgres() {
    python3 -c "import sys, psycopg2
try:
    conn = psycopg2.connect(dbname='flytask', user='postgres', password='password', host='db')
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)"
}

# Wait for PostgreSQL to be ready
until check_postgres; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 1
done

echo "PostgreSQL is up - continuing..."

# Run migrations and start Django server
python manage.py makemigrations users
python manage.py makemigrations tasks
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000