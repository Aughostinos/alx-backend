#!/usr/bin/python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """a class that inherits from
    BaseCaching and is a caching system
    """

    def put(self, key, item):
        """a method that adds Item to the cache"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """a method that gets an item by key"""
        return self.cache_data.get(key, None)
