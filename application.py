from flask import Flask, jsonify, json, request, Response
from models import db
from datetime import datetime
import models

app = Flask(__name__)

POSTGRES = {
    'db': 'ers-psql.chwc2d4rnuv3.us-east-2.rds.amazonaws.com:5432',
    'host': 'localhost',
    'user': 'postgres',
    'pw': 'ethanrobertsarah',
    'port': '5432',
}

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
db.init_app(app)

#### POSTS ROUTES #####

# GET all Posts
@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = models.Posts.query.all()
    jsonStr = json.dumps([p.toJSON() for p in posts])
    return jsonStr

# GET Post <post_id>
@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    jsonStr = json.dumps(post.toJSON())
    return jsonStr

# POST a new Post
@app.route('/api/posts', methods=['POST'])
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

# PATCH Post <post_id>
@app.route('/api/posts/<post_id>', methods=['PATCH'])
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

# DELETE Post <post_id>
@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    # Must delete all comments associated with post first due to foreign key constraint
    post_comments = models.Comments.query.filter_by(post_id=post_id)
    for c in post_comments:
        db.session.delete(c)
    #Now the post itself may be deleted
    post = models.Posts.query.filter_by(id=post_id).first()
    db.session.delete(post)
    db.session.commit()
    message = { 'message': 'Post deleted.'}
    resp = jsonify(message)
    resp.status_code = 200
    return resp

# Upvote
@app.route('/api/posts/<post_id>/votes', methods=['POST'])
def upvote(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    post.vote_count+=1
    db.session.commit()
    votes = { 'vote_count': post.vote_count }
    return jsonify(votes)

# Downvote
@app.route('/api/posts/<post_id>/votes', methods=['DELETE'])
def downvote(post_id):
    post = models.Posts.query.filter_by(id=post_id).first()
    post.vote_count-=1
    db.session.commit()
    votes = { 'vote_count': post.vote_count }
    return jsonify(votes)

#### COMMENTS ROUTES ####

#PATCH comment <comment_id>
@app.route('/api/posts/<post_id>/comments/<comment_id>', methods=['PATCH'])
def edit_comment(comment_id):
    post = models.Comments.query.filter_by(id=comment_id).first()
    post.content = request.json.get('content') or post.content
    db.session.commit()

    updated_comment = models.Comments.query.filter_by(id=comment_id).first()
    jsonStr = json.dumps(updated_comment.toJSON())
    return jsonStr

#DELETE comment <comment_id>
@app.route('/api/posts/comments/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = models.Comments.query.filter_by(id=comment_id).first()
    db.session.delete(comment)
    db.session.commit()
    message = { 'message': 'Comment deleted.'}
    resp = jsonify(message)
    resp.status_code = 200
    return resp

#POST new comment
@app.route('/api/posts/<post_id>/comments', methods=['POST'])
def add_comments(post_id):
    content = request.json.get('content')
    #post_id = request.json.get('post_id')
    created_at = datetime.now()
    new_comment = models.Comments(content, post_id, created_at)
    db.session.add(new_comment)
    db.session.commit()

    new_id = new_comment.id
    added_comment = models.Comments.query.filter_by(id=new_id).first()
    jsonStr = json.dumps(added_comment.toJSON())
    return jsonStr

@app.route('/api/posts/<post_id>/comments', methods=['GET'])
def get_comments(post_id):
    comments = models.Comments.query.filter_by(post_id=post_id)
    jsonStr = json.dumps([c.toJSON() for c in comments])
    return jsonStr

@app.route('/')
def root():
    return app.send_static_file('index.html')
    # return render_template('index.html')

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run()
