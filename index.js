const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const session = require('express-session')

const UsersMock = require('./mock/users-mock');

app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true, cookie: { maxAge: 60000 }}))

app.set('view engine', 'ejs');

app.use(express.static('public'));

router.get('/', function (req, res, next) {
  res.render("index.ejs", {
    error: null
  });
});

router.get('/dashboard', function (req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.write('<h1>Access Denied</h1><a href="/">Login</a>')
  }
}, function (req, res) {
  return res.render('dashboard.ejs', req.session.user)
})

router.post('/login', bodyParser.urlencoded({ extended: false }), function (req, res, next) {
  const id = req.body.email;
  const pw = req.body.password;

  try {
    const user = UsersMock.validateUserPassword(id, pw);
    req.session.user = user;

    if (req.session.user) {
      return res.redirect('/dashboard');
    } else {
      throw new Error('Server Error');
    }
     
  } catch (err) {
    res.statusCode = 401;
    return res.render('index.ejs', {
      error: 'Invalid user or password'
    });
  }
});

app.use('/', router)

app.listen(3000, function () {
  console.log('App listening on port 3000')
});
