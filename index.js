const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const session = require('express-session')
const UsersMock = require('./mock/users-mock');
const PowerBIClient = require('./power-bi/client');
const config = require('./power-bi/config.json');

app.set('view engine', 'ejs');

app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true, cookie: { maxAge: 600000 } }))
app.use(express.static('public'));

router.get('/', function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  return res.render("index.ejs", {
    error: null
  });
});

router.get('/logout', function (req, res) {
  req.session.user = null;
  return res.redirect('/');
})

router.get('/dashboard', function (req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).render('forbidden.ejs')
  }
}, async function (req, res) {
  try {
    const report = await PowerBIClient.getReport();
    const accessToken = await PowerBIClient.generateEmbedTokenWithRls(req.session.user.email, req.session.user.roles);

    if (report && report.embedUrl && accessToken) {
      return res.render('dashboard.ejs', {
        user: req.session.user,
        embeddedAccessToken: accessToken,
        embeddedReportId: config.reportId,
        report: report
      })
    } else {
      throw new Error('Report or AccessToken fail, check if you have the right environment variables');
    }

  } catch (err) {
    console.log(err);

    return res.status(500).send(err)
  }

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
    return res.status(400).render('index.ejs', {
      error: 'Usuario o contraseña incorrectos'
    });
  }
});

router.use(function (req, res, next) {
  return res.status(404).render('404.ejs');
})

app.use('/', router)

app.listen(3000, function () {
  console.log('App listening on port 3000')
});
