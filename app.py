from flask import Flask
from models import db

app = Flask(__name__)

POSTGRES = {
    'db': 'reddit-clone-3',
    'host': 'localhost',
}

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(host)s/%(db)s' % POSTGRES
db.init_app(app)

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run()
