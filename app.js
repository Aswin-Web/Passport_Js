const express = require('express')
const fs = require('fs')
const path = require('path')
const https = require('https')
const ejs = require('ejs')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const { default: helmet } = require('helmet')
const app = express()
const cookieSession = require('cookie-session')
const { serializeUser } = require('passport')
require('./passport-google')
// This cookie is generated in the Client side
app.use(
  cookieSession({
    name: 'node_app',
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['hdggjfdghd', 'key2']
  })
)
app.use(helmet())
// initialize an session
app.use(passport.initialize())
// To store session
app.use(passport.session())

app.set('view engine', 'ejs')

// tHE /GOOGLE TO CONTINUE GOOGLE LOGGING
app.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
// if login is true the response of the profile
app.get(
  '/cb',
  passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  })
)

app.get('/success', (req, res) => {
  console.log(req.user)
  res.send('Success')
})

app.get('/failure', (req, res) => {
  res.send('Failure')
})

app.get(
  '/home',
  (req, res, next) => {
    console.log(req.user.id)  // This value is from the deserializeUser()
    return next()
  },
  (req, res) => {
    res.render('homepage')
  }
)

app.get("/logout",(req,res)=>{
  req.logout() //Passport logging out functions
  res.send("logged out  ")
})

https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    },
    app
  )
  .listen(3000)
