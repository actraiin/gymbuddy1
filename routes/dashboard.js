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
                    (checkDayMatch(myProfiles[i]["monday"], profile[j]["monday"]) ||
                     checkDayMatch(myProfiles[i]["tuesday"], profile[j]["tuesday"]) ||
                     checkDayMatch(myProfiles[i]["wednesday"], profile[j]["wednesday"]) ||
                     checkDayMatch(myProfiles[i]["thursday"], profile[j]["thursday"])||
                    checkDayMatch(myProfiles[i]["friday"], profile[j]["friday"]) ||
                    checkDayMatch(myProfiles[i]["saturday"], profile[j]["saturday"])||
                    checkDayMatch(myProfiles[i]["sunday"], profile[j]["sunday"])))
                    
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
    
    function checkDayMatch(day1, day2)
    {
        if (day1 == "" || day2 == "")
        {
            return false;
        }
        
        var day1H = day1.substring(0,day1.indexOf(":"));
        var day1M = day1.substring(day1.indexOf(":")+1);
        
        var day2H = day2.substring(0,day2.indexOf(":"));
        var day2M = day2.substring(day2.indexOf(":")+1);
        
        var day1TotalMinutes = parseInt(day1H) * 60 + parseInt(day1M);
        var day2TotalMinutes = parseInt(day2H) * 60 + parseInt(day2M);
        
        if ((day1TotalMinutes + 15 >= day2TotalMinutes) && (day1TotalMinutes - 15 <= day2TotalMinutes))
        {
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