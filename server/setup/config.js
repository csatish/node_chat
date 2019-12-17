require('dotenv').config()
const e = process.env;

module.exports = {
    HTTPS_PORT:getPortNumbers(e).https,
    HTTP_PORT:getPortNumbers(e).http,
    ENVIRONMENT: e.ENVIRONMENT || 'local',
    MONGODB_URI: e.MONGODB_URI,
    REDIS_URI: e.REDIS_URI,
    TOKEN_SECRET: e.TOKEN_SECRET,
    SESSION_STORE:e.SESSION_STORE,
    SESSION_VALIDITY:e.SESSION_VALIDITY,
    LOG_LEVEL: e.LOG_LEVEL || 'VERBOSE',  //trace, debug, info, warn, error, fatal
    SITE_NAME: 'messageme.com',
    DEBUG_MODE:e.DEBUG_MODE
};

/** Get port number based on environment */
function getPortNumbers(e) {
    if(e.ENVIRONMENT === 'production') {
        return {https:e.HTTPS_PORT, http:e.HTTP_PORT}
    }
    else {
        return {https:e.DEV_HTTPS_PORT, http:e.DEV_HTTP_PORT}
    }
}



/** Casts a value as a boolean, ie a string containing 'true' */
function boolean(value) {
    if (typeof value === 'string') {
        return /^(true|t|yes|y|1)$/i.test(value.trim());
    }

    if (typeof value === 'number') {
        return value !== 0;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    return false;
}