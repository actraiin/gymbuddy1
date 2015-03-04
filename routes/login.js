
/*
 * GET home page.
 */
//var data = require('../userData.json');
var models = require('../models');

exports.login = function(req, res){
    //res.render('login');
    var username = req.params.username;
    var password = req.params.password;
        
    models.User
    .find()
    .where('username').equals(username)
    .where('password').equals(password)
    .exec(renderUser);
    
    function renderUser(err, user) {
        res.json(user);
    }

};