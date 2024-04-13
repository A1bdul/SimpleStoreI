import json
import hashlib
import pickle
from datetime import datetime


class MarketList:

    def __init__(self, max_size):
        self.max_size = max_size
        self._data = [None] * max_size
        self._count = 0

    def __getitem__(self, index):
        return self._data[index]

    def __setitem__(self, index, value):
        self._data[index] = value

    def __len__(self):
        return self._count

    def __iter__(self):
        return iter(self._data)

    def __str__(self):
        return str(list(self._data))

    def __bool__(self):
        return any(item is not None for item in self._data)

    def insert(self, index, value):
        if self._count < self.max_size:
            self._data.insert(index, value)
            self._count += 1
        else:
            self._data.pop(0)
            self._data.insert(index, value)

    def append(self, value):
        if self._count < self.max_size:
            self._data[self._count] = value
            self._count += 1
        else:
            self._data.pop(0)
            self._data.append(value)

    def to_dict(self):
        return {
            "max_size": self.max_size,
            "data": self._data,
            "count": self._count
        }

    def from_dict(self, data_dict):
        self.max_size = data_dict["max_size"]
        self._data = data_dict["_data"]
        self._count = data_dict["_count"]

    def count_non_empty(self):
        return sum(1 for item in self._data if item is not None)


def cart_update(cart, ordered_item, action):

    if action == "add_to_cart":
        ordered_id = ordered_item.get('product_id')
        if ordered_id not in cart:
            cart[ordered_id] = {'quantity': 1}
        else:
            cart[ordered_id]['quantity'] += 1
    elif action == "remove_from_cart":
        ordered_id = ordered_item.get('product_id')
        if ordered_id in cart:
            del cart[ordered_id]
    return cart  # Return the modified list
