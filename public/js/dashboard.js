'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    // Add any additional listeners here
    // example: $("#div-id").click(functionToCall);
    $("#logoutButton").click(logout);
    $("#helpButton").click(help);
    $("#myprofilesButton").click(myProfile);
    
    var name = "gymBuddyUser=";
    var ca = document.cookie.split(';');
    var username;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        username = c.substring(name.length);
        if (!c.indexOf(name) == 0)
            window.location.href = "/";
    }
    
    function displayMatches(matches) {
        // compose the HTML
        var new_html =
        '<tr><th><center>My username is...</center><th><center>I\'m free to work out at...</center></th></tr>';
        
        for (var i =0; i < matches.length; i++)
        {
            new_html+='<tr data-toggle="modal" data-target="#MatchInfoModal"><td><center>' +
                matches[i]["username"] +'</center></td><td>';
            
            if (matches[i]["monday"] != "")
                new_html+='Monday @ ' + matches[i]["monday"];
            if (matches[i]["tuesday"] != "")
                new_html+='Tuesday @ ' + matches[i]["tuesday"];
            if (matches[i]["wednesday"] != "")
                new_html+='Wednesday @ ' + matches[i]["wednesday"];
            if (matches[i]["thursday"] != "")
                new_html+='Thursday @ ' + matches[i]["thursday"];
            if (matches[i]["friday"] != "")
                new_html+='Friday @ ' + matches[i]["friday"];
            if (matches[i]["saturday"] != "")
                new_html+='Saturday @ ' + matches[i]["saturday"];
            if (matches[i]["sunday"] != "")
                new_html+='Sunday @ ' + matches[i]["sunday"];
            
            new_html+='</td></tr>';

        }
        
        $(".tftable")[0].innerHTML = new_html;
    }
    
    // issue the GET request
    $.get('/dashboard/' + username, displayMatches);

}

function logout(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    document.cookie = "gymBuddyUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/";
}

function myProfile(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    window.location.href = "/myprofiles";
}
function help(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    window.location.href = "/help";
}
