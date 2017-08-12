# invisible-recaptcha

A simple Express wrapper for Google's invisible Recaptcha.

## Installation
```
npm install --save invisible-recaptcha
```

## Usage

Requires secret reCaptcha key provided by Google. Returns a router to be used as middleware. Please note that this wrapper does not configure the `body-parser` middleware, so you must do that yourself. Note that you're responsible for getting the client-side data and `POST`ing it to the endpoint.

#### Parameters
```js
recaptchaRouter(secretKey, callbackSuccess, callbackFail, options)
```

The request and response of the `POST` is passed to both callbacks, ie:
```js
function callbackSuccess(req, res) {}
function callbackFail(req, res) {}
```

#### Examples
```js
const express = require('express');
const recaptchaRouterFactory = require('invisible-recaptcha');
const bodyParser = require('body-parser');
const SECRET_KEY = "SECRET";
const app = express();

const recaptchaRouter = recaptchaRouterFactory(SECRET_KEY, captchaSuccess, captchaFail);

function captchaSuccess(req, res) { res.send('reCaptcha success!') }
function captchaFail(req, res) { res.send('reCaptcha failed.') }

app.use(bodyParser.urlencoded({ extended });
app.use('/myEndpoint', recaptchaRouter);
```

More in-depth examples to come soon.

#### Options
* `options.sendIp` - Boolean. The Google's reCaptcha API doesn't require the client's IP address; it's optional. Defaults to `true`.
* `options.usingProxy` - Boolean. If `options.sendIp` is `true`, then you must specify whether you're using a reverse proxy. Defaults to `false`.

## Disclaimer
The creator, nor the project are in any way associated with Google. Also, this is my first public NPM package, so please be gentle ;)

If you have any criticisms, questions, suggestions, or simply want to talk, you can email me at pscott@zeptohost.com
