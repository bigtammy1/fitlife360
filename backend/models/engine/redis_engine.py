#!/usr/bin/env python3
"""Redis Engine"""
import redis
import os


class RedisEngine:
    """Redis client"""
    def __init__(self):
        """Constructor"""
        url= os.getenv('REDIS_URL')
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
    
