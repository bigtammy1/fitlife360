#!/usr/bin/env python3
"""Redis Engine"""

from redis import Redis


class RedisEngine:
    """Redis client"""
    def __init__(self):
        """Constructor"""
        self.__redis = Redis(host='localhost', port=6379, decode_responses=True)
    
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
    
