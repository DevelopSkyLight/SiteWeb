const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
// const conexion = require('../database/db');
// const { promisify } = require('util');
const pool = require('../database/database');

const signinView = async (req, res) => {
  res.render('pages/signin', { layout: false, alert: false })
}

const signinPost = async (req, res) => {

  try {
    const wallet = req.body.wallet;
    const password = req.body.password;

    if (!wallet || !password) {
      res.render('pages/signin', {
        layout: false,
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y password",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'signin'
      })
    } else {
      pool.query('SELECT * FROM users WHERE wallet = ?', [wallet], async (error, results) => {
        if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
          res.render('pages/signin', {
            layout: false,
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o password incorrectas",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'signin'
          })
        } else {
          const id = results[0].id
          const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
          })
          const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 1000),
            httpOnly: true
          }
          res.cookie('jwt', token, cookiesOptions)
          res.render('pages/signin', {
            layout: false,
            alert: true,
            alertTitle: "Conexión exitosa",
            alertMessage: "¡LOGIN CORRECTO!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 800,
            ruta: 'main'
          })
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const signoff = async (req, res) => {
  res.clearCookie('jwt')
  return res.redirect('/')
}

module.exports = {
  signinView,
  signinPost,
  signoff
}