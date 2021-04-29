from faker import Faker
from app.models import db, List

faker = Faker()

# Adds a demo list, you can add other lists here if you want


def seed_lists():
    for i in range(100):
        demo = List(
            userId=1,
            title=faker.sentence()
        )

        db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the lists table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key


def undo_lists():
    db.session.execute('''TRUNCATE TABLE lists
    CASCADE;''')
    db.session.execute('''ALTER SEQUENCE lists_id_seq RESTART WITH 1;''')
    db.session.commit()
