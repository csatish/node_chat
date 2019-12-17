let session = require('express-session')
let FileStore = require('session-file-store')(session);
let config = require('./config')

module.exports = function (app) {

    /** set session lib to manage session of users */
    let sessionFSOptions = {path: config.SESSION_STORE}
    let sessionOption = {
        secret:config.TOKEN_SECRET,
        resave: false,
        saveUninitialized: true,
        store:new FileStore(sessionFSOptions),
        cookie:{maxAge:parseInt(config.SESSION_VALIDITY), httpOnly: true} //duration in ms, HttpOnly to prevent XSS(cross-site scripting), XST(min chance of trace)
    };

    if(app.get('env') === 'production') {
        //avoid Cross-site Request Forgery
        sessionOption.cookie.secure =  true; ///serve secure cookies, will work with https
        app.set('trust proxy', 1); //trust first proxy
    }
    app.use(session(sessionOption));

}