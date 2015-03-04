
/*
 * GET home page.
 */
//var data = require('../userData.json');
var models = require('../models');

exports.registerNewUser = function(req, res){
    var name = req.params.name;
    var age = req.params.age;
    var gender = req.params.gender;
    var contact = req.params.contact;
    var username = req.params.username;
    var password = req.params.password;

    valid = {"valid":true};

        var newPost = new models.User({
            "name": name,
            "age": age,
            "gender": gender,
            "contact": contact,
            "username": username,
            "password": password
        });
        newPost.save(afterSaving);
        
        function afterSaving(err) {
            if(err) console.log(err);
            res.send("Okay");
        }
};