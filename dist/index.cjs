var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => ValidateTelegramWebAppData
});
module.exports = __toCommonJS(src_exports);
var crypto = __toESM(require("crypto"), 1);
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
//# sourceMappingURL=index.cjs.map