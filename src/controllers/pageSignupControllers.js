const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
// const conexion = require('../database/db');
// const { promisify } = require('util');
const pool = require('../database/database');


const signupView = async (req, res) => {
  let sponsorcode = req.params.sponsorcode;
  console.log(req.params);

  if (!sponsorcode) {
    if (req.cookies.ref) {
      sponsorcode = req.cookies.ref;
    } else {
      sponsorcode = 'none';
    }
  } else {
    const cookiesOptions = {
      expires: new Date(Date.now() + process.env.REF_COOKIE_EXPIRES * 1000),
      httpOnly: true
    }
    res.cookie('ref', sponsorcode, cookiesOptions);
  }
  
  res.render('pages/signup', {
    layout: false,
    alert: false,
    sponsorcode: sponsorcode
  })
}

const signupPost = async (req, res) => {
  try {
    const referral_link = req.body.referral_link;
    const wallet = req.body.wallet;
    const password = req.body.password;
    const username = req.body.username;

    pool.query('SELECT * FROM users WHERE wallet = ?', [wallet], async (error, results) => {
      if (results.length !== 0) {
        res.render('pages/signup', {
          layout: false,
          alert: true,
          sponsorcode: referral_link,
          alertTitle: "Error",
          alertMessage: "Usuario ya existe",
          alertIcon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: 'signin'
        })
      } else {
        let passwordHash = await bcryptjs.hash(password, 8);
        // console.log(passwordHash)
        pool.query('INSERT INTO users SET ?', { wallet: wallet, password: passwordHash, username: username, referral_link: referral_link }, (error, results) => {
          if (error) { console.log(error) }
          res.redirect('/signin')
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  signupView,
  signupPost
}