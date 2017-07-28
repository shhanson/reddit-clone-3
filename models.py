from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self, *args):
        super().__init__(*args)

    def __repr__(self):
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })

class Posts(BaseModel, db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(16), nullable=False)
    body = db.Column(db.String(600), nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    vote_count = db.Column(db.Integer, default=0)

class Comments(BaseModel, db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(140), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
