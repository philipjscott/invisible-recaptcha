const request = require('request');
const bodyParser = require('body-parser');

module.exports = function(app, key, callbackSuccess, callbackFail, options) {
  options = options || {};
  options.endpoint = options.endpoint || '/recaptcha';
  options.sendIp = options.sendIp || true;
  options.usingProxy = options.usingProxy || false;

  app.post(options.endpoint, function validateReCaptcha(req, res) {
    let url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + key + '&response=' + req.body;
    let ip = options.usingProxy ? request.headers['x-forwarded-for'] : request.connection.remoteAddress;
    if (options.sendIp) {
      url += '&remoteip=' + ip;
    }
    request.get(url, function handleGoogleReply(err, googleRes, body) {
      if (JSON.parse(body).success) {
        callbackSuccess();
      } else {
        callbackFail();
      }
    });
  });
};
