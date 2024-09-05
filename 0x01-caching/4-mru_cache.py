#!/usr/bin/env python3
""" MRU Cache module
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """caching system that follows MRU.
    """

    def __init__(self):
        """ Initialize the class with additional attributes """
        super().__init__()
        self.access_order = []

    def put(self, key, item):
        """a method that adds Item to the cache"""
        if key is not None and item is not None:
            if key in self.cache_data:
                # Remove the old key
                self.access_order.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # remove the most recently used item
                mru_key = self.access_order.pop()
                del self.cache_data[mru_key]
                print(f"DISCARD: {mru_key}")

            # Store the item
            self.cache_data[key] = item
            self.access_order.append(key)

    def get(self, key):
        """a method that gets an item by key"""
        if key in self.cache_data:
            # Update access order
            self.access_order.remove(key)
            self.access_order.append(key)
            return self.cache_data.get(key)
        return None
