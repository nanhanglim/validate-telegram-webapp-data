const crypto = require("crypto");

class ValidateTelegramWebAppData {
    /**
     * Creates ValidateTelegramWebAppData instance.
     * @constructor
     * @param {string} telegram_bot_token - your Telegram bot's token
     */
    constructor(telegram_bot_token) {
        this.telegram_bot_token = telegram_bot_token;
    }

    /**
     * Returns true if data is valid; false if data is invalid/has expired.
     * @param {object} data - object of initData received from Telegram
     * @param {number} secondsToExpire - number of seconds to expire from auth_date; enter 0 to ignore expiry check
     */
    ValidateData({hash, ...data}, secondsToExpire) {
        const data_check_string = Object.keys(data)
        .sort()
        .map(key => `${key}=${data[key]}`)
        .join('\n');
        const secret_key = crypto.createHmac('sha256', 'WebAppData').update(this.telegram_bot_token).digest();
        const hmac = crypto.createHmac('sha256', secret_key).update(data_check_string).digest('hex');
        const currentTime = parseInt(Date.now() / 1000);
        const currentAndAuthTimeDiff = currentTime - parseInt(data['auth_date']);
        if (secondsToExpire == 0) {
            return hmac === hash ? true : false;
        } else {
            return currentAndAuthTimeDiff < secondsToExpire && hmac == hash ? true : false;
        }
    }
}

module.exports = ValidateTelegramWebAppData;