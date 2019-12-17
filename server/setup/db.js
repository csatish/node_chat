// https://www.digitalocean.com/community/tutorials/how-to-integrate-mongodb-with-your-node-application
// https://medium.com/codingthesmartway-com-blog/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-2-637f337e5d61
const mongoose = require('mongoose')
let config = require('./config')


try {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.once('open', function() {
        console.log("MongoDB database connection established successfully");
    })
}
catch(e) {
    console.log("DB connection error", e)
}


const gracefulExit = () => {
    mongoose.connection.close(() => {
        console.log("Closing Mongo connection");
        process.exit(0);
    });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);