import time


class MemoryCache:

    def __init__(self):
        self.store = {}

    def get(self, key):

        if key not in self.store:
            return None

        data, expire = self.store[key]

        if expire < time.time():
            del self.store[key]
            return None

        return data

    def set(self, key, value, ttl=60):

        expire = time.time() + ttl

        self.store[key] = (value, expire)


cache = MemoryCache()