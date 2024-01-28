# Validate Telegram WebApp (Mini App) Data
[![npm version](https://badge.fury.io/js/@nanhanglim%2Fvalidate-telegram-webapp-data.svg)](https://badge.fury.io/js/@nanhanglim%2Fvalidate-telegram-webapp-data)

Library to [validate Telegram WebApp (Mini App) Data](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app)

---
# Installation
```
npm i --save @nanhanglim/validate-telegram-webapp-data
```

# Demo
Start a chat with [@WebAppDataDemoBot](https://t.me/WebAppDataDemoBot) on Telegram and tap on the "Demo" button.
![Demo button on the left of the Attachment button, highlighted by a red box](https://raw.githubusercontent.com/nanhanglim/validate-telegram-webapp-data/master/demoBtn.jpeg)

# Usage
```
// import library
import ValidateTelegramWebAppData from "@nanhanglim/validate-telegram-webapp-data";

// initialise instance
const VTWAD = new ValidateTelegramWebAppData('BOT_TOKEN_HERE');

...

// check if data is valid/not expired
const validate = VTWAD.ValidateData(initData, 3600); // 1 hour
const isValid = validate.isValid; // boolean
const data = validate.data; // parsed initData in object
```

You may also set `secondsToExpire` to 0 to ignore expiry check

```
const validate = VTWAD.ValidateData(initData, 0); // never expires
const isValid = validate.isValid; // boolean
const data = validate.data; // parsed initData in object
```
