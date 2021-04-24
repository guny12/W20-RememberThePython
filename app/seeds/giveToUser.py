from faker import Faker
from app.models import db, giveToUser

faker = Faker()


# Adds a demo giveToUser, you can add other giveToUsers here if you want
def seed_giveToUsers():
    for i in range(50):

        db.session.execute(f'''INSERT INTO givetousers (user_id, task_id)
      VALUES ({i + 1}, {i + 1});''')

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the giveToUsers table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key
def undo_giveToUsers():
    db.session.execute('''TRUNCATE TABLE giveToUsers;''')
    db.session.commit()
