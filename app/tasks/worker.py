import asyncio

from app.tasks.queue import get_job


async def worker_loop():

    while True:

        job = await get_job()

        try:

            await job()

        except Exception as e:

            print("Worker error:", e)