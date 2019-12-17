let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Admin  = new Schema({
    adminId: {
        type: Number,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    displayName:{
        type: String
    },
    loginName: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    emailId: {
        type: String,
        unique: true,
    },
    status: {
        type: Number
    },
    createDate: {
        type: Date
    },
    lastUpdate: {
        type: Date
    }
});


module.exports = mongoose.model('admins', Admin);