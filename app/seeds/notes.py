from faker import Faker
from app.models import db, Note

faker = Faker()

# Adds a demo note, you can add other notes here if you want


def seed_notes():
    for i in range(500):
        demo = Note(userId=1, taskId=faker.pyint(min_value=1, max_value=80), content=faker.paragraph(nb_sentences=10))

        db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the notes table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key


def undo_notes():
    db.session.execute(
        """TRUNCATE TABLE notes
    CASCADE;"""
    )
    db.session.execute("""ALTER SEQUENCE notes_id_seq RESTART WITH 1;""")
    db.session.commit()
