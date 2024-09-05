#!/usr/bin/env python3
""" LFU Cache module
"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """caching system that follows LFU.
    """

    def __init__(self):
        """ Initialize the class with additional attributes """
        super().__init__()
        self.freq = {}
        self.access_order = {}
        self.access_time = 0

    def put(self, key, item):
        """a method that adds Item to the cache"""
        if key is not None and item is not None:
            if key in self.cache_data:
                # Update the existing item
                self.cache_data[key] = item
                self.freq[key] += 1
                self.access_order[key] = self.access_time
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    # Find the least frequently used key
                    lfu_key = min(self.freq, key=lambda k: (
                        self.freq[k], self.access_order[k]))
                    del self.cache_data[lfu_key]
                    del self.freq[lfu_key]
                    del self.access_order[lfu_key]
                    print(f"DISCARD: {lfu_key}")

                # Add the new item
                self.cache_data[key] = item
                self.freq[key] = 1
                self.access_order[key] = self.access_time

            # Update the access time
            self.access_time += 1

    def get(self, key):
        """a method that gets an item by key"""
        if key in self.cache_data:
            # Update the frequency and access order
            self.freq[key] += 1
            self.access_order[key] = self.access_time
            self.access_time += 1
            return self.cache_data.get(key)
        return None
