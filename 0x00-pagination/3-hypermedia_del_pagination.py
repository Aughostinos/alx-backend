#!/usr/bin/env python3
"""
Task 3. Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None,
                        page_size: int = 10) -> Dict[str, Any]:
        """
        Return a dictionary with pagination information
        that is resilient to deletion.
        """
        # validate index
        assert isinstance(index, int) and 0 <= index < len(
            self.indexed_dataset())

        data = []
        current_index = index
        next_index = index

        while len(data) < page_size and next_index < len(
                                                self.indexed_dataset()):
            item = self.indexed_dataset().get(next_index)
            if item:
                data.append(item)
            next_index += 1

        # hyper_index
        hyper_index_info = {
            'index': index,
            'next_index': next_index,
            'page_size': len(data),
            'data': data
        }

        return hyper_index_info
