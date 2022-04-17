# Validate Telegram WebApp Data
[![npm version](https://badge.fury.io/js/@nanhanglim%2Fvalidate-telegram-webapp-data.svg)](https://badge.fury.io/js/@nanhanglim%2Fvalidate-telegram-webapp-data)

Library to [validate Telegram WebApp Data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app)

---
# Installation
```
npm i --save @nanhanglim/validate-telegram-webapp-data
```

# Usage
```
// import library
const ValidateTelegramWebAppData = require('@nanhanglim/validate-telegram-webapp-data');

// initialise instance
const VTWAD = new ValidateTelegramWebAppData('BOT_TOKEN_HERE');

...

// check if data is valid/not expired
const dataIsValid = VTWAD.ValidateData(initData, 3600); // 1 hour
```

You may also set `secondsToExpire` to 0 to ignore expiry check

```
const dataIsValid = VTWAD.ValidateData(initData, 0); // never expires
```
