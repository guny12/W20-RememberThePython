from faker import Faker
from app.models import db, Task

faker = Faker()

# Adds a demo task, you can add other tasks here if you want


def seed_tasks():
    for i in range(50):
        demo = Task(
            creatorId=faker.pyint(min_value=1, max_value=50),
            listId=faker.pyint(min_value=1, max_value=50),
            content=faker.paragraph(nb_sentences=10)
        )

        db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the tasks table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key


def undo_tasks():
    db.session.execute('''TRUNCATE TABLE tasks
    CASCADE;''')
    db.session.execute('''ALTER SEQUENCE tasks_id_seq RESTART WITH 1;''')
    db.session.commit()
