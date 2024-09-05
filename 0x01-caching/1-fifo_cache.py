#!/usr/bin/env python3
""" FIFOCache module
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache is a caching system that follows the FIFO.
    """

    def __init__(self):
        """ Initialize the class with additional attributes """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """a method that adds Item to the cache"""
        if key is not None and item is not None:
            if key not in self.cache_data:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    # remove the first item inserted
                    first_key = self.order.pop(0)
                    del self.cache_data[first_key]
                    print(f"DISCARD: {first_key}")

                # Add the new key to the order list
                self.order.append(key)

            # Store the item in cache_data
            self.cache_data[key] = item

    def get(self, key):
        """a method that gets an item by key"""
        return self.cache_data.get(key, None)
