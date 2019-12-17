let express = require('express');
let router = express.Router();
let {addAdmin, valiidateLogin} = require('../models/adminsMgr')


//Just like app.all, it gets called for all actions of this route, add before to handle before others
// router.use(function (req,res,next) {
//     console.log(">>>URL http method and function:",req.method," ",req.url);
//     next();
// });


/** Handling login page path */
router.get('/login', (req, res, next) => {
    let activeSession = verifySession(req, res, next);
    if(activeSession) {
        res.render('app');
    }
    else {
        let pageParts = {headerTitle:"Header",form:"signIn", footerTitle:"Footer"};
        if(req.session && req.session.msgContent) {
            pageParts.msgContent = req.session.msgContent
            delete req.session.msgContent
        }
        res.render('login', pageParts); //ejs component, parts of component
    }
});


/** Handling signup page path */
router.get('/signup', (req, res, next) => {
    let pageParts = {headerTitle:"Header",form:"signUp", footerTitle:"Footer"};
    res.render('login', pageParts);
    next();
});


/** Handling forgot-password page path */
router.get('/forgotPwd', (req, res, next) => {
    let pageParts = {headerTitle:"Header",form:"forgotPwd", footerTitle:"Footer"};
    res.render('login', pageParts);
    next();
});


router.get('/auth/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});


/** Handling login form action path */
router.post('/login', (req, res, next) => {
    handleAuthorization(req.body, (isUserFound, user) => {
        console.log(">>>>>>>>>isUserFound:", isUserFound)
        if(!isUserFound) {
            //Set to show msg
            req.session.msgContent = {msgTitle:"Error", msg:"Login error found"}
            res.redirect('/auth/login')
        }
        else {
            req.session.user = user
            res.redirect('/')
        }
        next();
    });
});


/** Handling signup form action path */
router.post('/signup', (req, res, next) => {
    addAdmin(req.body,()=> {
        req.session.msgContent = {
            msgTitle:"New password generated.",
            msg:"Your new password has been generated. Use the same to login."
        };
        res.redirect('/auth/login');
        next();
    })
});


/** Handling forgotPwd form action path */
router.post('/forgotPwd', (req, res, next) => {
    req.session.msgContent = {
        msgTitle:"Registration Successful.",
        msg:"Congratulations. Your account has been created."
    };
    res.redirect('/auth/login');
    next();
});


let handleAuthorization = (reqParams, callback) => {
    const loginName = reqParams.loginName;
    const password = reqParams.password;
    valiidateLogin({loginName, password},callback);
}


let verifySession = (req, res, next) => {
    if(req.session.user) {
        return true;
    }
    return false;
};


module.exports = {
    verifySession,
    authRouter: router
}