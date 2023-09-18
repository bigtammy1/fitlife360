#!/usr/bin/env python3
"""Redis Engine"""
import redis
from redis import Redis
import os


class RedisEngine:
    """Redis client"""
    def __init__(self):
        """Constructor"""
        url= os.getenv('REDIS_URL', None)
        # if url is None:
        #     self.__redis = Redis('localhost', 6379, decode_responses=True)
        # else: (development)
        self.__redis = redis.from_url(url, decode_responses=True, ssl_cert_reqs=None)
    
    def isAlive(self):
        """checks if redis server is connected"""
        return self.__redis.ping()

    def get(self, key):
        """gets value from redis"""
        return self.__redis.get(key)
    
    def set(self, key, value, expiration):
        """set redis key"""
        self.__redis.set(key, value, ex=expiration)
    
    def delete(self, key):
        """delete redis key"""
        self.__redis.delete(key)
    
