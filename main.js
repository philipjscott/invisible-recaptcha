const request = require('request');

module.exports = function(app, key, callbackSuccess, callbackFail, options) {
  options = options || {};
  options.endpoint = options.endpoint || '/recaptcha';
  options.sendIp = options.sendIp || true;
  options.usingProxy = options.usingProxy || false;

  app.post(options.endpoint, function validateReCaptcha(req, res) {
    let url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + key + '&response=' + req.body;
    let ip = options.usingProxy ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
    if (options.sendIp) {
      url += '&remoteip=' + ip;
    }
    request.get(url, function handleGoogleReply(err, googleRes, body) {
      if (JSON.parse(body).success) {
        callbackSuccess(req, res);
      } else {
        callbackFail(req, res);
      }
    });
  });
};
