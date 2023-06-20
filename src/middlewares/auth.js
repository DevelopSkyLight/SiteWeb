const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { promisify } = require('util');
const pool = require('../database/database');

const isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
      pool.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results) => {
        if (!results) { return next() }
        req.user = results[0]
        return next()
      })
    } catch (error) {
      console.log(error)
      return next()
    }
  } else {
    res.redirect('/signin')
  }
}

module.exports = {
  isAuthenticated
}