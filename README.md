# invisible-recaptcha
A simple Node.js wrapper for Google's invisible Recaptcha.

## Installation
```
npm install --save invisible-recaptcha
```

## Usage
Requires an express instance, along with your secret reCaptcha key provided by Google. Please note that this wrapper does not configure the `body-parser` middleware, so you must do that yourself. This wrapper sets up a `POST` endpoint, specified by `options.endpoint` (by default it's `'/recaptcha'`). Note that you're responsible for getting the client-side data and `POST`ing it to the endpoint.

#### Parameters
```js
recaptcha(expressApp, secretKey, callbackSuccess, callbackFail, options)
```

The request and response of the `POST` is passed to both callbacks, ie:
```js
function callbackSuccess(req, res) {}
function callbackFail(req, res) {}
```

#### Examples
```js
const express = require('express');
const recaptcha = require('invisible-recaptcha');
const bodyParser = require('body-parser');
const SECRET_KEY = "SECRET";
const app = express();

function captchaSuccess(req, res) { res.send('reCaptcha success!') }
function captchaFail(req, res) { res.send('reCaptcha failed.') }

app.use(bodyParser.urlencoded({ extended });
recaptcha(app, SECRET_KEY, captchaSuccess, captchaFail);
```

More in-depth examples to come soon.

#### Options
* `options.endpoint` - String. Specifies the `POST` endpoint for receiving the Google token from client-side. Defaults to `'/recaptcha'`
* `options.sendIp` - Boolean. The Google's reCaptcha API doesn't require the client's IP address; it's optional. Defaults to `true`.
* `options.usingProxy` - Boolean. If `options.sendIp` is `true`, then you must specify whether you're using a reverse proxy. Defaults to `false`.
* `options.theme` - String. Specifies the reCaptcha theme. Your choices are `'dark'` and `'light'`. Defaults to `'light'`.

## Disclaimer
The creator, nor the project is in no way associated with Google. Also, this is my first public NPM package, so please be gentle ;)

If you have any criticisms, questions, requests, or simply want to talk, you can email me at pscott@zeptohost.com
