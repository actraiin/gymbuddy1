var global_profileName;
var global_liftingRangeValue 
var global_liftingSkillValue;
var global_runningRangeValue;
var global_runningSkillValue;
var global_mondayTimeValue;
var global_tuesdayTimeValue;
var global_wednesdayTimeValue;
var global_thursdayTimeValue;
var global_fridayTimeValue;
var global_saturdayTimeValue;
var global_sundayTimeValue;

var numberOfProfiles = 1;
//var data = require('../userData.json');
var models = require('../models');

exports.addProfile = function(req, res){
    console.log("addProfile.addProfile");

    global_profileName = req.query.profileName;
    global_liftingRangeValue = req.query.liftingRange; 
    global_liftingSkillValue = req.query.liftingskill;
    global_runningRangeValue = req.query.runningRange;
    global_runningSkillValue = req.query.runningskill;
    global_mondayTimeValue = req.query.monday_time;
    global_tuesdayTimeValue = req.query.tuesday_time;
    global_wednesdayTimeValue = req.query.wednesday_time;
    global_thursdayTimeValue = req.query.thursday_time;
    global_fridayTimeValue = req.query.friday_time;
    global_saturdayTimeValue = req.query.saturday_time;
    global_sundayTimeValue = req.query.sunday_time;

    res.render('addProfile');
    
}

exports.add = function(req, res) {
    var username = req.params.username;
    var profileName = global_profileName;
    var liftingRangeValue = global_liftingRangeValue; 
    var liftingSkillValue = global_liftingSkillValue;
    var runningRangeValue = global_runningRangeValue;
    var runningSkillValue = global_runningSkillValue;
    var mondayTimeValue = global_mondayTimeValue;
    var tuesdayTimeValue = global_tuesdayTimeValue;
    var wednesdayTimeValue = global_wednesdayTimeValue;
    var thursdayTimeValue = global_thursdayTimeValue;
    var fridayTimeValue = global_fridayTimeValue;
    var saturdayTimeValue = global_saturdayTimeValue;
    var sundayTimeValue = global_sundayTimeValue;

    var newProfile = new models.Profile({
        "username": username,
        "profileName": profileName,
        "spottingRange": liftingRangeValue,
        "spottingSkill": liftingSkillValue,
        "runningRange": runningRangeValue,
        "runningSkill": runningSkillValue,
        "monday": mondayTimeValue,
        "tuesday": tuesdayTimeValue,
        "wednesday": wednesdayTimeValue,
        "thursday": thursdayTimeValue,
        "friday": fridayTimeValue,
        "saturday": saturdayTimeValue,
        "sunday": sundayTimeValue
    });

    newProfile.save(afterSaving);
    
    function afterSaving(err) {
        if(err) console.log(err);
        //res.render('addProfile');
        console.log("Saving is done");
        res.render('myprofiles');
    }
}