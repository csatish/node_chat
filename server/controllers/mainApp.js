let express = require('express');
let router = express.Router();
let {verifySession} = require('./auth')
router.get('/*', function (req, res, next) {
     let activeSession = verifySession(req, res, next);
    if(activeSession) {
        let ua = req.headers['user-agent']
        console.log('User agent:', ua);
        if(ua.indexOf("Mobile") > -1) {
            res.render('mobApp'); //app
        }
        else {
            res.render('app');
        }
    }
    else {
        res.redirect('/auth/login'); //res.render('app');
    }
    next();
});

module.exports = router;