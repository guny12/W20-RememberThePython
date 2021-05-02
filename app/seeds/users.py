from faker import Faker
from app.models import db, User

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_users():
    demoUser = User(
        firstName="John", lastName="Doe", email="demoUser@user.io", username="demolition", password="password"
    )
    db.session.add(demoUser)
    for i in range(10):
        demo = User(
            firstName=faker.first_name(),
            lastName=faker.last_name(),
            email=faker.email(),
            username=faker.simple_profile()["username"],
            password=faker.password(length=10),
        )

        db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key


def undo_users():
    db.session.execute(
        """TRUNCATE TABLE users
    CASCADE;"""
    )
    db.session.execute("""ALTER SEQUENCE users_id_seq RESTART WITH 1;""")
    db.session.commit()
