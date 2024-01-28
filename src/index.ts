import * as crypto from "crypto";

export default class ValidateTelegramWebAppData {
    /**
     * Creates ValidateTelegramWebAppData instance.
     * @constructor
     * @param {string} telegramBotToken - your Telegram bot's token
     */
    telegramBotToken: string;

    constructor(telegramBotToken: string) {
        this.telegramBotToken = telegramBotToken;
    }

    /**
     * @param {string} initData - initData received from Telegram
     * @param {number} secondsToExpire - number of seconds to expire from auth_date; enter 0 to ignore expiry check
     * @returns {ValidateDataResponse} - Returns an object with keys 'isValid' and 'data'. 
     * - Value of 'isValid' will be true if data is valid; false if data is invalid/has expired. 
     * - Value of 'data' contains the parsed initData in object
     */
    ValidateData(initData: any, secondsToExpire: number): ValidateDataResponse {
        const params = new URLSearchParams(initData);
        const data: WebAppInitData = {};
        let hash = "";
        for (const [key, value] of params.entries()) {
            key === "hash" ? hash = value : data[key] = value;
        };
        const dataCheckString = Object.keys(data)
            .sort()
            .map(key => `${key}=${data[key]}`)
            .join('\n');
        const secret_key = crypto.createHmac('sha256', 'WebAppData').update(this.telegramBotToken).digest();
        const hmac = crypto.createHmac('sha256', secret_key).update(dataCheckString).digest('hex');
        const currentTime = Date.now() / 1000;
        const currentAndAuthTimeDiff = currentTime - data['auth_date'];
        if (secondsToExpire == 0) {
            return {
                isValid: hmac === hash ? true : false,
                data
            }
        } else {
            return {
                isValid: currentAndAuthTimeDiff < secondsToExpire && hmac === hash ? true : false,
                data
            }
        }
    }
}

interface ValidateDataResponse {
    isValid: boolean,
    data: WebAppInitData
}

interface WebAppUser {
    id: number,
    is_bot?: boolean,
    first_name: string,
    last_name?: string,
    username?: string,
    language_code?: string,
    is_premium?: true,
    added_to_attachment_menu?: true,
    allows_write_to_pm?: true,
    photo_url?: string
};

interface WebAppChat {
    id: number,
    type: string,
    title: string,
    username?: string,
    photo_url?: string
};

interface WebAppInitData {
    query_id?: string,
    user?: WebAppUser,
    receiver?: WebAppUser,
    chat?: WebAppChat,
    chat_type?: string,
    chat_instance?: string,
    start_param?: string,
    can_send_after?: number,
    auth_date?: number | undefined,
    hash?: string | undefined
};