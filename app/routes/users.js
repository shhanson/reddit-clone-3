const express = require('express');
const knex = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

const saltRounds = 11;

// GET a user
router.get('/:id', (req, res, next) => {
  // Allow user to see all their own posts/comments
});

// New user registration
router.post('/register', validate, (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds).then((digest) => {
    knex('users').insert({
      username: req.body.username,
      hashed_password: digest,
    }).returning('id').then((userId) => {
      res.json(userId);
    })
    .catch((err) => {
      next(err);
    });
  });
});

// New session
router.post('/login', validate, (req, res, next) => {
  knex('users').where('username', req.body.username).first().then((user) => {
    const storedPassword = user.hashed_password;
    const userId = user.id;

    bcrypt.compare(req.body.password, storedPassword).then((matched) => {
      if (matched) {
        req.session.id = userId;
        res.json(userId);
      }
    }).catch((err) => {
      err.status = 401;
      next(err);
    });
  });
});

// End session
router.delete('/logout', (req, res) => {
  req.session = null;
  res.end();
});

function validate(req, res, next) {
  const errors = [];
  ['username', 'password'].forEach((field) => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({ field, messages: ['cannot be blank'] });
    }
  });
  if (errors.length) return res.status(422).json({ errors });
  next();
}

module.exports = router;
