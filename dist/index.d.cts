declare class ValidateTelegramWebAppData {
    /**
       * Creates ValidateTelegramWebAppData instance.
       * @constructor
       * @param {string} telegramBotToken - your Telegram bot's token
       */
    telegramBotToken: string;
    constructor(telegramBotToken: string);
    /**
       * @param {string} initData - initData received from Telegram
       * @param {number} secondsToExpire - number of seconds to expire from auth_date; enter 0 to ignore expiry check
       * @returns {ValidateDataResponse} - Returns an object with keys 'isValid' and 'data'.
       * - Value of 'isValid' will be true if data is valid; false if data is invalid/has expired.
       * - Value of 'data' contains the parsed initData in object
       */
    ValidateData(initData: any, secondsToExpire: number): ValidateDataResponse;
}
interface ValidateDataResponse {
    isValid: boolean;
    data: WebAppInitData;
}
interface WebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: true;
    added_to_attachment_menu?: true;
    allows_write_to_pm?: true;
    photo_url?: string;
}
interface WebAppChat {
    id: number;
    type: string;
    title: string;
    username?: string;
    photo_url?: string;
}
interface WebAppInitData {
    [key: string]: any;
    query_id?: string;
    user?: WebAppUser;
    receiver?: WebAppUser;
    chat?: WebAppChat;
    chat_type?: string;
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date?: number;
    hash?: string;
}

export { ValidateTelegramWebAppData as default };
