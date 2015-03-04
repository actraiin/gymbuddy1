'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    if ($("#backButton").size() == 0)
    {
        var d = new Date();
        var exdays = 1;
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        
        var query = window.location.search.substring(1);
        var username = query.split("&")[4];
        username = username.substring(username.indexOf("=")+1);
        document.cookie = "gymBuddyUser=" + username + "; " + expires;
        window.location.href = "dashboard";
    }
    $("#backButton").click(back);
}

function back(e) {
    window.location.href = "register";
}