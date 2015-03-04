'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
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

    function backFromAdd(result) {
    	window.location.href = "/myprofiles";
    }


    // issue the GET request
	$.get('/addProfile/' + username, backFromAdd);
}
