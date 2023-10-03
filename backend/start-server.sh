#!/bin/bash
# start the environment
sudo service mysql start
./redis-7.2.1/src/redis-server > /dev/null 2>&1 &
python -m run
