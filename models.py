from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Memory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500))