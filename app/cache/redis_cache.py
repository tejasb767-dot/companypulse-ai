import redis
import json

from app.config.settings import get_settings

settings = get_settings()


class RedisCache:

    def __init__(self):

        try:
            self.client = redis.Redis(
                host="localhost",
                port=6379,
                decode_responses=True,
            )

            self.client.ping()

        except Exception:
            self.client = None

    def get(self, key):

        if not self.client:
            return None

        data = self.client.get(key)

        if not data:
            return None

        return json.loads(data)

    def set(self, key, value, ttl=60):

        if not self.client:
            return

        self.client.set(
            key,
            json.dumps(value),
            ex=ttl,
        )

    def delete(self, key):

        if not self.client:
            return

        self.client.delete(key)


cache = None


def get_cache():
    global cache

    if cache is None:
        cache = RedisCache()

    return cache


cache = get_cache()