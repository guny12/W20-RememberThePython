from faker import Faker
from app.models import db, Task

faker = Faker()

# Adds a demo task, you can add other tasks here if you want


def seed_tasks():
    for i in range(500):
        demo = Task(
            creatorId=1,
            listId=faker.pyint(min_value=1, max_value=80),
            content=faker.paragraph(nb_sentences=10),
            completed=faker.boolean(chance_of_getting_true=50),
            priority=faker.pyint(min_value=0, max_value=5),
            dueDate=faker.future_date(end_date="+1000d"),
        )
        db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the tasks table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key


def undo_tasks():
    db.session.execute("""TRUNCATE TABLE tasks CASCADE;""")
    db.session.execute("""ALTER SEQUENCE tasks_id_seq RESTART WITH 1;""")
    db.session.commit()
