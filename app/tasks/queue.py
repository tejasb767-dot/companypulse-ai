import asyncio

queue = asyncio.Queue()


async def add_job(job):

    await queue.put(job)


async def get_job():

    return await queue.get()