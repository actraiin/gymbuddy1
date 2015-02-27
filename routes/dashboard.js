//var data = require('../userData.json');
var models = require('../models');

exports.viewDashboard = function (req, res) {
    
	res.render('dashboard');
}

exports.viewMatches = function (req, res) {
    var username = req.params.username;
    var myProfiles;
    
    models.Profile
    .find({"username":username})
    .exec(renderProfile);
    
    function renderProfile(err, profile) {
        myProfiles = profile;
        
        models.Profile
        .find({"username":{$ne:username}})
        .exec(renderOtherProfile);
        
        //res.json(matches);
    }
    
    function renderOtherProfile(err, profile) {
        var matches = [];
        
        for (var i = 0; i < myProfiles.length; i++)
        {
            for (var j = 0; j < profile.length; j++)
            {
                if ((myProfiles[i]["spottingRange"] == profile[j]["spottingRange"] ||
                    myProfiles[i]["runningRange"] == profile[j]["runningRange"]) &&
                    ((myProfiles[i]["monday"] == profile[j]["monday"] && profile[j]["monday"] != "") ||
                     (myProfiles[i]["tuesday"] == profile[j]["tuesday"] && profile[j]["tuesday"] != "") ||
                     (myProfiles[i]["wednesday"] == profile[j]["wednesday"] && profile[j]["wednesday"] != "") ||
                     (myProfiles[i]["thursday"] == profile[j]["thursday"] && profile[j]["thursday"] != "")||
                    (myProfiles[i]["friday"] == profile[j]["friday"] && profile[j]["friday"] != "") ||
                    (myProfiles[i]["saturday"] == profile[j]["saturday"] && profile[j]["saturday"] != "")||
                    (myProfiles[i]["sunday"] == profile[j]["sunday"] && profile[j]["sunday"] != "") ))
                    
                {
                    if (!existsInArray(matches,profile[j]))
                        matches.push(profile[j]);
                }
            }
        }

        res.json(matches);
    }
    
    function existsInArray(arr, item)
    {
        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] == item)
                return true;
        }
        return false;
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