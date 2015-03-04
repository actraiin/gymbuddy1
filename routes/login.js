
/*
 * GET home page.
 */
//var data = require('../userData.json');
var models = require('../models');

exports.login = function(req, res){
    //res.render('login');
    var username = req.query.username;
    var password = req.query.password;
    
    /*
    var valid = {"valid":false};
    var i
    for (i = 0; i < data["userData"].length; i++)
    {
        if (data["userData"][i].username == username &&
            data["userData"][i].password == password)
        {
            valid = {"valid":true};
        }
    }
     res.render('login',valid);
     */
    
    models.User
    .find()
    .where('username').equals(username)
    .where('password').equals(password)
    .exec(renderUser);
    
    function renderUser(err, user) {
        res.render('login', { 'user': user });
    }

};