from db import DBConnector

class Login(object):
    def __init__(self):
        self.db = DBConnector("127.0.0.1", 3306, "root", "dlstodrmsid", "dtr")

    def find(self, identifier, password):
        with self.db.connect() as cursor:
            cursor.execute(
                    """
                        SELECT *
                        FROM user
                                WHERE identifier = %s
                                     AND password = %s
                    """,
                    (identifier, password))
            return cursor.fetchall()
