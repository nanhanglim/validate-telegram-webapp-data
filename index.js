const crypto = require("crypto");

class ValidateTelegramWebAppData {
    /**
     * Creates ValidateTelegramWebAppData instance.
     * @param {string} telegram_bot_token 
     */
    constructor(telegram_bot_token) {
        this.telegram_bot_token = telegram_bot_token;
    }

    /**
     * Returns true if data is valid; false if data is invalid.
     * @param {object} data 
     */
    ValidateData({hash, ...data}) {
        const data_check_string = Object.keys(data)
        .sort()
        .map(key => `${key}=${data[key]}`)
        .join('\n');
        const secret_key = crypto.createHmac("sha256", "WebAppData").update(this.telegram_bot_token).digest('hex');
        const hmac = crypto.createHmac('sha256', secret_key).update(data_check_string).digest('hex');
        return hmac === hash ? true : false;
    }
}

module.exports = ValidateTelegramWebAppData;