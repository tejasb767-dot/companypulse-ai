import asyncio


def run_background(coro):

    loop = asyncio.get_event_loop()

    loop.create_task(coro)