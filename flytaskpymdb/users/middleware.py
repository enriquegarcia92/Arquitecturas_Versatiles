from djongo.base import DatabaseWrapper
from pymongo.database import Database


def patched_close(self):
    if self.connection is not None:
        self.connection.close()


DatabaseWrapper._close = patched_close
