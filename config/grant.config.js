var _500pxConfig = require('./500px.config.js');
module.exports = {
  server: {
    protocol: 'http',
    host: 'localhost:3000',
    "transport": "session",
    "state": true
  },
  "500px": {
    key: _500pxConfig.CONSUMER_KEY,
    secret: _500pxConfig.CONSUMER_SECRET,
    callback: '/handle_callback'
  }
}