let fs = require('fs')
let path = require('path');
let http = require('http');
let https = require('https');
let express = require('express');
let ejs = require('ejs') //Embedded JS template

let config = require('./config')
let db = require('./db');
let {authRouter} = require('../controllers/auth');
let mainApp = require('../controllers/mainApp');

//List n KILL process for a port
//sudo lsof -i tcp:443
// 'sudo apachectl stop' to stop process on port 80
//TODO:
/**  Use link for building bundle file for server side code */
//https://medium.freecodecamp.org/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab


let app = express();
/** Set middlewares */
require('./middleware')(app)


function start() {
    app.use(express.static('public'));
// app.use(express.static('files'));
    app.use(express.static(path.join(__dirname, '../files')));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    /** set the view engine to ejs */
    app.set('view engine', 'ejs');
    app.set("views", path.join(__dirname, '../views')); //default dir views parallel to package.json

    /** Set route paths */
    app.use('/auth', authRouter);
    app.use('/', mainApp);

    /** Set https server connection */
    let credentials = {
        key: fs.readFileSync('etc/ssl/key.pem'),
        cert: fs.readFileSync('etc/ssl/certificate.pem'),
        dhparam: fs.readFileSync('etc/ssl/dh-strong.pem')
    };

    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.HTTPS_PORT, function () {
        console.log("HTTPS listening on port:", config.HTTPS_PORT);
    });


    /** Listening on default port so that we don't have to specify port no in url*/
    /** Running http server to redirect any incoming http request to https */
    let httpApp = http.createServer(function (req, res) {
        console.log("Redirecting.....")
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    });
    httpApp.listen(config.HTTP_PORT, function(){
        console.log("HTTP listening on port:", config.HTTP_PORT);
    });


    /** Add before to handle all route path ahead of request processed/response send */
    app.all('/*', function(req, res, next){
        console.log("req.secure>>.", req.secure, req.originalUrl)
        validateRequest(req, res, next);
    });
}


const allowedMethods = ['GET','HEAD','POST'];
function validateRequest(req, res, next) {
    if (req.isSocket) {
        //TODO: Handle it with testing
        console.log("Web socket conn found>>>>>>>")
        res.redirect('wss://' + req.headers.host + req.url)
    }

    if (!allowedMethods.includes(req.method)) {
        res.statusCode = 405;
        return res.end('Method Not Allowed');
    }
    next();
}


/** handle uncaught exception in process */
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(1); //mandatory (as per the Node docs)
});


/** the asynchronous or synchronous code that emits otherwise uncaught error */
/** code to test above exception */
// var err = new Error('example')
// throw err

module.exports = {
    start,
    app
}
