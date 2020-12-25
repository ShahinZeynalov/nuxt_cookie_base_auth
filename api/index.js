import express from 'express'
import cookieParser from 'cookie-parser'
const session = require('express-session')

const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}));
 
app.use(bodyParser.json())

app.use(cookieParser());

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: false,
  // cookie: { maxAge: 60000 },
  cookie: {
    maxAge: 60000,
    httpOnly: true,
    sameSite: false,
    path: '/'
  },
  }))

app.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

let users = []
users.push({ username: 'shahin' , password: 'password'})

app.post('/auth/login', (req, res) => {

  console.log('the body: ', req.body)
  var user = null

  // iterating the array return if user is exists.
  for (const _user of users) {
    if(_user.username === req.body.username && _user.password === req.body.password) {
      user = _user
    }
    
  }
  
  if (user) {
    req.session.authUser = { username: user.username }
    return res.status(200).json({ username: user.username })
  }
  // console.log(res);
  res.status(401).json({ message: 'Bad credentials' })
})

app.post('/auth/register', (req, res) => {
  console.log('the body: ', req.body)
  // first serializing the form data, if valid save it to the database.
  if (req.body.username && req.body.password) {
    const user = { username: req.body.username , password: req.body.password}
    // storing the registered user in array.
    users.push(user)
    console.log('users-----', users);
    //if successfull sending success response
    return res.status(200).json({ message: 'You have signed up successfully.' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

app.post('/auth/logout', (req, res) => {
  delete req.session.authUser
  res.status(204).json({ ok: true })
  })

module.exports = {
  path: '/api/',
  handler: app
}
