const express = require('express');
const knex = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

const saltRounds = 11;

// GET a user
router.get('/users/:id', (req, res, next) => {
  // Allow user to see all their own posts/comments
});

// New user registration
router.post('/', validate, (req, res, next) => {
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
router.post('/login', (req, res, next) => {

});

// End session
router.delete('/logout', (req, res) => {

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
