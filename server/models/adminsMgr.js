const Admin = require('./admins')
const addAdmin = (adminData, callback) => {
    if(!adminData.firstName || !adminData.lastName || !adminData.loginName || !adminData.password) {
        return callback(false, "missing value")
    }
    let adminObj = {
        firstName:adminData.firstName,
        lastName:adminData.lastName,
        displayName: adminData.firstName + " " + adminData.lastName,
        loginName:adminData.loginName,
        password:adminData.password,
        status:1
    }
    let admin = new Admin(adminObj);
    admin.save()
        .then(todo => {
            console.log('admins: Admin added successfully')
            return callback(true) //res.status(200).json({'admins': 'Admin added successfully'});
        })
        .catch(err => {
            console.log("adding new admin failed")
            return callback(false)
        });
}

const valiidateLogin = ({loginName, password}, callback) => {

    Admin.findOne({$and:[{"loginName":loginName},{"password":password}]}, function (err, admin) {
        console.log("Fetched admins", admin, " Error:",err)
        let isUserFound = false
        if(!err && admin) {
            isUserFound = true
        }
        callback(isUserFound,admin)
    })
}

const getAdminByLoginName = (loginName) => {
    Admin.findOne(loginName, function (err, admin) {
        if (!err) {
            console.log(admin)
        }
        else {
            console.log(err)
        }
    });
}


module.exports = {
    addAdmin,
    getAdminByLoginName,
    valiidateLogin
}