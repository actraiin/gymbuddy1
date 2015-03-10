
'use strict';

var global_pNum;
var global_username;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
	$("#newprofilename").keyup(function() {
		var tempProfilename = $("#newprofilename").val();
		function doesProfileExist(result) {
			var i;
			for (i = 0; i < result.length; ++i) {
				if (result[i].profileName == tempProfilename) {
					$("#existingProfilename").text("Profile name already exists.");
					$("#addBtn").attr('disabled',true);
					break;
				} else {
					$("#existingProfilename").text("");
					$("#addBtn").attr('disabled',false);
				}
			}
		}
		// issue the GET request
		if (tempProfilename.length > 0) {
			$.get('/myprofiles/' + global_username, doesProfileExist);
		}
	});
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#backButton").click(projectClick);
    $("#delBtn").click(delProfile);

    var name = "gymBuddyUser=";
    var ca = document.cookie.split(';');
    var username;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        username = c.substring(name.length);
        if (!c.indexOf(name) == 0){}
            //window.location.href = "/";
    }

    global_username = username;

    function displayProfiles(profiles) {
    	if (profiles.length == 0) {
            $("#profilesTap").text("");
            $("#emptyProfilesTable").attr('style', 'visibility: visible; display:block;');
            return;
        } else {
            $("#profilesTap").text("Tap anywhere on a workout to edit it.");
            $("#emptyProfilesTable").attr('style', 'visibility: hidden; display:none;');
        }

    	// compose the HTML
    	var new_html = '<tr><th><center>Name</center></th><th><center>Activity</center></th><th><center>Days</center></th></tr>';
    	
    	for (var i = 0; i < profiles.length; i++) {
    		new_html += '<tr onclick=loadProfileToEdit("' + profiles[i]["_id"] + '") data-toggle="modal" data-target="#EditProfileModal">';
    		new_html += '<td>'+ profiles[i].profileName + '</td>';
    		new_html += '<td>';

    		if (profiles[i].spottingRange != "N/A" || profiles[i].spottingSkill != "0")
    			new_html += 'SPOTTER' + '<br>';
    		if (profiles[i].spottingRange != "N/A")
    			new_html += profiles[i].spottingRange + ' (lbs), ';
    		if (profiles[i].spottingSkill != "0")
    			new_html += profiles[i].spottingSkill + '<br><br>';

    		if (profiles[i].runningRange != "N/A" || profiles[i].runningSkill != "0")
    			new_html += 'RUNNING' + '<br>';
    		if (profiles[i].runningRange != "N/A")
    			new_html += profiles[i].runningRange + ' (mi), ';
    		if (profiles[i].runningSkill != "0")
    			new_html += profiles[i].runningSkill;

    		new_html += '</td><td>';

    		if (profiles[i]["monday"] != "")
                new_html += 'Monday @ ' + profiles[i]["monday"] + '<br>';
            if (profiles[i]["tuesday"] != "")
                new_html += 'Tuesday @ ' + profiles[i]["tuesday"] + '<br>';
            if (profiles[i]["wednesday"] != "")
                new_html += 'Wednesday @ ' + profiles[i]["wednesday"] + '<br>';
            if (profiles[i]["thursday"] != "")
                new_html += 'Thursday @ ' + profiles[i]["thursday"] + '<br>';
            if (profiles[i]["friday"] != "")
                new_html += 'Friday @ ' + profiles[i]["friday"] + '<br>';
            if (profiles[i]["saturday"] != "")
                new_html += 'Saturday @ ' + profiles[i]["saturday"] + '<br>';
            if (profiles[i]["sunday"] != "")
                new_html += 'Sunday @ ' + profiles[i]["sunday"] + '<br>';

            new_html += '</td></tr>';
    	}

    	$(".tftable")[0].innerHTML = new_html;
    }

    // issue the GET request
    $.get('/myprofiles/' + username, displayProfiles);
}

function delProfile() {
	if (confirm("Are you sure you want to delete this profile?")) {
		$(this).parent().parent().attr("action", "/deleteProfile");
	}
}

function projectClick(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    window.location.href = "/dashboard";
}

function loadProfileToEdit(pNum) {
	global_pNum = pNum;
	$.get('/myprofiles/' + global_username + "/" + pNum, loadModalWithProfile);
	
	//window.location.href = "myprofiles";
}

function loadModalWithProfile (result) {

	//remove class active
	$("#radio_1_label_lift").removeClass("active");
	$("#radio_2_label_lift").removeClass("active");
	$("#radio_3_label_lift").removeClass("active");
	$("#radio_4_label_lift").removeClass("active");
	$("#radio_5_label_lift").removeClass("active");
	$("#radio_1_label_run").removeClass("active");
	$("#radio_2_label_run").removeClass("active");
	$("#radio_3_label_run").removeClass("active");
	$("#radio_4_label_run").removeClass("active");
	$("#radio_5_label_run").removeClass("active");

/*
	var j;
    for (j = 0; j < result.profiles.length; j++) {
        if (result.profiles[j].profileNumber == global_pNum) {
            var profileSpecificData = result.profiles[j];
            break;
        }           
    }  

	var profile = profileSpecificData;
	var profileName = profile.profileName;
	var liftingrange = profile.spotter[0].range;
	var liftingskill = profile.spotter[0].skill;
	var runningrange = profile.running[0].distance;
	var runningskill = profile.running[0].skill;
	var mondaytime = profile.schedule[0].monday;
	var tuesdaytime = profile.schedule[0].tuesday;
	var wednesdaytime = profile.schedule[0].wednesday;
	var thursdaytime = profile.schedule[0].thursday;
	var fridaytime = profile.schedule[0].friday;
	var saturdaytime = profile.schedule[0].saturday;
	var sundaytime = profile.schedule[0].sunday;
*/

	var profileName = result[0].profileName;
	var liftingrange = result[0].spottingRange;
	var liftingskill = result[0].spottingSkill;
	var runningrange = result[0].runningRange;
	var runningskill = result[0].runningSkill;
	var mondaytime = result[0].monday;
	var tuesdaytime = result[0].tuesday;
	var wednesdaytime = result[0].wednesday;
	var thursdaytime = result[0].thursday;
	var fridaytime = result[0].friday;
	var saturdaytime = result[0].saturday;
	var sundaytime = result[0].sunday;

	//$('#editModalTitle').text("Edit Profile " + profileNum);
	$('#profileNameEditID').val(profileName);
	$('#liftingRangeSelect option[value="' + liftingrange + '"]').prop('selected', true);
	var radioSelectorLift = "#radio_" + liftingskill + "_lift";
	var radioLabelSelectorLift = "#radio_" + liftingskill + "_label_lift";
	$(radioSelectorLift).prop("checked", true);
	$(radioLabelSelectorLift).addClass("active");
	$('#runningRangeSelect option[value="' + runningrange + '"]').prop('selected', true);
	var radioSelectorRun = "#radio_" + runningskill + "_run";
	var radioLabelSelectorRun = "#radio_" + runningskill + "_label_run";
	$(radioSelectorRun).prop("checked", true);
	$(radioLabelSelectorRun).addClass("active");

	$("#montime").val(mondaytime);
	$("#tuestime").val(tuesdaytime);
	$("#wedtime").val(wednesdaytime);
	$("#thurstime").val(thursdaytime);
	$("#fritime").val(fridaytime);
	$("#sattime").val(saturdaytime);
	$("#suntime").val(sundaytime);
}
