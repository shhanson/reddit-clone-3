from flask import Flask, jsonify, json, request
from models import db
from datetime import datetime
import models

app = Flask(__name__)

POSTGRES = {
    'db': 'reddit-clone-3',
    'host': 'localhost',
}

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(host)s/%(db)s' % POSTGRES
db.init_app(app)


@app.route('/', methods=['GET'])
def get_posts():
    posts = models.Posts.query.all()
    jsonStr = json.dumps([p.toJSON() for p in posts])
    return jsonStr

@app.route('/', methods=['POST'])
def add_post():
    title = request.json.get('title')
    author = request.json.get('author')
    body = request.json.get('body')
    image_url = request.json.get('image_url')
    vote_count = 0
    created_at = datetime.now()
    new_post = models.Posts(title, author, body, image_url, vote_count, created_at)
    db.session.add(new_post)
    db.session.commit()

    new_id = new_post.id
    added_post = models.Posts.query.filter_by(id=new_id).first()
    jsonStr = json.dumps(added_post.toJSON())
    return jsonStr

@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run()
