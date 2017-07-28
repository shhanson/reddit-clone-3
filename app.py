from flask import Flask, jsonify, json, request, Response
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


@app.route('/posts', methods=['GET'])
def get_posts():
    posts = models.Posts.query.all()
    jsonStr = json.dumps([p.toJSON() for p in posts])
    return jsonStr

@app.route('/posts', methods=['POST'])
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

@app.route('/posts/<post_id>', methods=['PATCH'])
def edit_post(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    post.title = request.json.get('title') or post.title
    post.author = request.json.get('author') or post.author
    post.body = request.json.get('body') or post.body
    post.image_url = request.json.get('image_url') or post.image_url
    db.session.commit()

    updated_post = models.Posts.query.filter_by(id=post_id).first()
    jsonStr = json.dumps(updated_post.toJSON())
    return jsonStr

@app.route('/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    db.session.delete(post)
    db.session.commit()
    message = { 'message': 'Post deleted.'}
    resp = jsonify(message)
    resp.status_code = 200
    return resp


@app.route('/<post_id>/comments/<comment_id>', methods=['PATCH'])
def edit_comment(comment_id):
    post = models.Comments.query.filter_by(id=comment_id).first()
    post.content = request.json.get('content') or post.content
    db.session.commit()

    updated_comment = models.Comments.query.filter_by(id=comment_id).first()
    jsonStr = json.dumps(updated_comment.toJSON())
    return jsonStr


@app.route('/posts/<post_id>/votes', methods=['POST'])
def upvote(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    post.vote_count+=1
    db.session.commit()
    return jsonify(post.vote_count)

@app.route('/posts/<post_id>/votes', methods=['DELETE'])
def downvote(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    post.vote_count-=1
    db.session.commit()
    return jsonify(post.vote_count)




@app.route('/comments/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = models.Comments.query.filter_by(id=comment_id).first()
    db.session.delete(comment)
    db.session.commit()
    message = { 'message': 'Comment deleted.'}
    resp = jsonify(message)
    resp.status_code = 200
    return resp
  
  
@app.route('/<post_id>/comments', methods=['POST'])
def add_comments():
    content = request.json.get('content')
    post_id = request.json.get('post_id')
    created_at = datetime.now()
    new_comment = models.Comments(content, post_id, created_at)
    db.session.add(new_comment)
    db.session.commit()

    new_id = new_comment.id
    added_comment = models.Comments.query.filter_by(id=new_id).first()
    jsonStr = json.dumps(added_comment.toJSON())
    return jsonStr

# @app.route('/comments', methods=['GET'])
# def get_comments():
#     comments = models.Comments.query.all()
#     jsonStr = json.dumps([c.toJSON() for c in comments])
#     return jsonStr


@app.route('/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    jsonStr = json.dumps(post.toJSON())
    return jsonStr


@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run()
