#!/usr/bin/env python3
""" LIFO Cache module
"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """caching system that follows LIFO.
    """

    def __init__(self):
        """ Initialize the class with additional attributes """
        super().__init__()
        self.last_key = None

    def put(self, key, item):
        """a method that adds Item to the cache"""
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if self.last_key:
                    # remove the last item inserted
                    del self.cache_data[self.last_key]
                    print(f"DISCARD: {self.last_key}")

            # Store the new item
            self.cache_data[key] = item
            self.last_key = key

    def get(self, key):
        """a method that gets an item by key"""
        return self.cache_data.get(key, None)
