const express = require('express');
const request = require('request');

function recaptchaRouter(key, callbackSuccess, callbackFail, options) {
  let router = express.Router();

  options = options || {};
  options.sendIp = options.sendIp || true;
  options.usingProxy = options.usingProxy || false;
  options.theme = options.theme || 'light';

  router.post('/', function validateReCaptcha(req, res) {
    let url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + key + '&response=' + req.body + '&theme=' + options.theme;
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

  return router;
}

module.exports = recaptchaRouter;
