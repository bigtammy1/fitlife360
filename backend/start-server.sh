#!/bin/bash
# start the environment
source ./venv/bin/activate
sudo service mysql start
./redis-7.2.1/src/redis-server > /dev/null 2>&1 &
python -m app
