//var data = require('../userData.json');
var models = require('../models');

exports.viewMyprofiles = function (req, res) {
	console.log("myprofiles.viewMyprofiles");
    res.render('myprofiles');
	/*var i
    for (i = 0; i < data["userData"].length; i++) {
        if (data["userData"][i].username == "gym") {
        	var newdata = data["userData"][i];
        	break;
        }           
    }
    //console.log(newdata);
	res.render('myprofiles', newdata);*/
}

exports.viewProfiles = function (req, res) {
    var username = req.params.username;

    models.Profile
    .find({"username":username})
    .exec(renderProfileList);

    function renderProfileList(err, profileList) {
        res.json(profileList);
    }
}

exports.fetchProfile = function (req, res) {
    var pid = req.params.pNum;
    
    models.Profile
    .find({"_id":pid})
    .exec(renderSelectedProfile);

    function renderSelectedProfile(err, selectedProfile) {
        res.json(selectedProfile);
    }
}
