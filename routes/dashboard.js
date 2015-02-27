//var data = require('../userData.json');
var models = require('../models');

exports.viewDashboard = function (req, res) {
    
	res.render('dashboard');
}

exports.viewMatches = function (req, res) {
    var username = req.params.username;
    
    models.Profile
    .find()
    .where('username').ne(username)
    .exec(renderProfile);
    
    function renderProfile(err, profile) {
        res.json(profile);
    }
    

}

exports.fetchMatch = function(req, res) {
    var pid = req.params.pID;

    models.Profile
    .find({"_id":pid})
    .exec(renderSelectedMatch);

    function renderSelectedMatch(err, selectedMatch) {
        res.json(selectedMatch);
    }
}