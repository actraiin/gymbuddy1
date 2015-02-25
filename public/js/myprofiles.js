
'use strict';

var global_pNum;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#backButton").click(projectClick);
    $("#delBtn").click(delProfile);

    var name = "gymBuddyUser=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (!c.indexOf(name) == 0)
            window.location.href = "/";
    }
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
	$.get('/userdata', loadModalWithProfile);
	
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
