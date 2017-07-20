const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt');

const saltRounds = 11;

router.get('/users/:id', (req, res, next) => {

});

router.post('/users/:id', (req, res, next) => {

});

router.post('/session', (req, res, next) => {

});

router.delete('/logout', (req, res) => {

});
