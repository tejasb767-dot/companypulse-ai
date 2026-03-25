import time

requests = {}


def allow(key, limit=5):

    now = time.time()

    if key not in requests:
        requests[key] = []

    requests[key] = [
        t for t in requests[key]
        if now - t < 60
    ]

    if len(requests[key]) >= limit:
        return False

    requests[key].append(now)

    return True