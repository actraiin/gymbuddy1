'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$("#newusername").keyup(function() {
		var tempUsername = $("#newusername").val();

		function doesUserExist(result) {
			if (result.length != 0) {
				$("#existingUsername").text("Username already exists.");
				$("#createUserButton").attr('disabled',true);
			} else {
				$("#existingUsername").text("");
				$("#createUserButton").attr('disabled',false);
			}
		}
		// issue the GET request
		if (tempUsername.length > 0) {
    		$.get('/userdata/' + tempUsername, doesUserExist);
   	 	}
	});
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    // Add any additional listeners here
    // example: $("#div-id").click(functionToCall);
    $("#backButton").click(projectClick);
}

function projectClick(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    window.location.href = "/";
}