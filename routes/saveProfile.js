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

//var numberOfProfiles = 1;
//var data = require('../userData.json');
var models = require('../models');

exports.saveProfile = function(req, res){    
    global_profileName = req.query.profileNameEdit;
    global_liftingRangeValue = req.query.liftingRangeEdit; 
    global_liftingSkillValue = req.query.liftingskillEdit;
    global_runningRangeValue = req.query.runningRangeEdit;
    global_runningSkillValue = req.query.runningskillEdit;
    global_mondayTimeValue = req.query.monday_timeEdit;
    global_tuesdayTimeValue = req.query.tuesday_timeEdit;
    global_wednesdayTimeValue = req.query.wednesday_timeEdit;
    global_thursdayTimeValue = req.query.thursday_timeEdit;
    global_fridayTimeValue = req.query.friday_timeEdit;
    global_saturdayTimeValue = req.query.saturday_timeEdit;
    global_sundayTimeValue = req.query.sunday_timeEdit;
    
    res.render('saveProfile');

}

exports.save = function(req, res) {
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

    console.log("new lifting skill value: " + liftingSkillValue);

    models.Profile
    .find({"username":username, "profileName":profileName})
    .update({
        "username":username,
        "profileName":profileName,
        "spottingRange":liftingRangeValue,
        "spottingSkill":liftingSkillValue,
        "runningRange":runningRangeValue,
        "runningSkill":runningSkillValue,
        "monday":mondayTimeValue,
        "tuesday":tuesdayTimeValue,
        "wednesday":wednesdayTimeValue,
        "thursday":thursdayTimeValue,
        "friday":fridayTimeValue,
        "saturday":saturdayTimeValue,
        "sunday":sundayTimeValue})
    .exec(afterSaving);

    function afterSaving(err, results) {
        if(err) console.log(err);
        res.render('myprofiles');
    }
}
    