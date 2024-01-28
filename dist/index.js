// src/index.ts
import * as crypto from "crypto";
var ValidateTelegramWebAppData = class {
  /**
   * Creates ValidateTelegramWebAppData instance.
   * @constructor
   * @param {string} telegramBotToken - your Telegram bot's token
   */
  telegramBotToken;
  constructor(telegramBotToken) {
    this.telegramBotToken = telegramBotToken;
  }
  /**
   * @param {string} initData - initData received from Telegram
   * @param {number} secondsToExpire - number of seconds to expire from auth_date; enter 0 to ignore expiry check
   * @returns {ValidateDataResponse} - Returns an object with keys 'isValid' and 'data'. 
   * - Value of 'isValid' will be true if data is valid; false if data is invalid/has expired. 
   * - Value of 'data' contains the parsed initData in object
   */
  ValidateData(initData, secondsToExpire) {
    const params = new URLSearchParams(initData);
    const data = {};
    let hash = "";
    for (const [key, value] of params.entries()) {
      key === "hash" ? hash = value : data[key] = value;
    }
    ;
    const dataCheckString = Object.keys(data).sort().map((key) => `${key}=${data[key]}`).join("\n");
    const secret_key = crypto.createHmac("sha256", "WebAppData").update(this.telegramBotToken).digest();
    const hmac = crypto.createHmac("sha256", secret_key).update(dataCheckString).digest("hex");
    const currentTime = Date.now() / 1e3;
    const currentAndAuthTimeDiff = currentTime - data["auth_date"];
    if (secondsToExpire == 0) {
      return {
        isValid: hmac === hash ? true : false,
        data
      };
    } else {
      return {
        isValid: currentAndAuthTimeDiff < secondsToExpire && hmac === hash ? true : false,
        data
      };
    }
  }
};
export {
  ValidateTelegramWebAppData as default
};
//# sourceMappingURL=index.js.map