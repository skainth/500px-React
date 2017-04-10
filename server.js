var path =          require('path');
var webpack =       require('webpack');
var express =       require('express');
var bodyParser =    require('body-parser');
var session =       require('express-session');
var FileStore =     require('session-file-store')(session);
var webpackConfig = require('./webpack.config');
var Grant =         require('grant-express');
var grantConfig =   require('./config/grant.config.js');

const api = require('./src/api');

var app = express();

app.use(bodyParser.json());

app.use(session({
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(new Grant(grantConfig));

app.get('/handle_callback', function (req, res) {
  req.session.access_token = req.session.grant.response.access_token;
  req.session.access_secret = req.session.grant.response.access_secret;

  res.redirect('/');
});
app.get('/user', (req, res) => {
  api.getUserDetails(req.session, (err, response) => {
    if (!err) {
      res.json(response);
    } else {
      res.json({error: true, message: err.message});
    }
  });
});
app.post('/love', (req, res) =>{
  const {access_token, access_secret} = req.session;
  if(!access_token){
    res.json({error: true, msg: "not authorized"});
    return;
  }
  api.lovePhoto(req.body.params, {access_token, access_secret}, (resp)=> {
    res.json(resp);
  });
});

var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:' + port + '/');
});