from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Posts(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(16), nullable=False)
    body = db.Column(db.String(600), nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    vote_count = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.Date, default=datetime.now(), nullable=False)
    #
    # def __init__(self, title, author, body, image_url):
    #     self.title = title
    #     self.author = author
    #     self.body = body
    #     self.image_url = image_url
    #     self.vote_count = 0
    #     self.created_at = datetime.now()

    def __repr__(self):
        return self.title


class Comments(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(140), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now(), nullable=False)

    # def __init__(self, content, post_id):
    #     self.post_id = post_id
    #     self.content = content
    #     self.created_at = datetime.now()

    def __repr__(self):
        return self.content
