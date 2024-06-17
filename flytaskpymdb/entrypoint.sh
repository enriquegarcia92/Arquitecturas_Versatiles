#!/bin/bash

# Function to check if MongoDB is ready
check_mongodb() {
    python3 -c "import sys, pymongo
try:
    client = pymongo.MongoClient('mongodb+srv://00093619:flytask580@flytaskcluster.xlycw9x.mongodb.net/flytask?retryWrites=true&w=majority')
    client.admin.command('ping')
except pymongo.errors.ConnectionFailure:
    sys.exit(-1)
sys.exit(0)"
}

# Wait for MongoDB to be ready
until check_mongodb; do
    echo "MongoDB is unavailable - sleeping"
    sleep 1
done

echo "MongoDB is up - continuing..."

# Run Django migrations and start the server
python manage.py makemigrations users
python manage.py makemigrations tasks
python manage.py migrate
python manage.py runserver 0.0.0.0:8001
