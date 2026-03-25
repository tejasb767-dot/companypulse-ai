import redis
import json

from app.config.settings import get_settings

settings = get_settings()


class RedisCache:

    def __init__(self):

        self.client = redis.Redis(
            host="localhost",
            port=6379,
            decode_responses=True,
        )

    def get(self, key):

        data = self.client.get(key)

        if not data:
            return None

        return json.loads(data)

    def set(self, key, value, ttl=60):

        self.client.set(
            key,
            json.dumps(value),
            ex=ttl,
        )


cache = None


def get_cache():
    global cache

    if cache is None:
        cache = RedisCache()

    return cache


cache = get_cache()