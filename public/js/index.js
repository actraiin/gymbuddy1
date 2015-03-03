'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#registerButton").click(register);
    $("#loginButton").click(validate);
    
    var random_num = Math.random();
    
    var random_num = Math.random();
    
    if(random_num > 0.5){
        $("#helpButton2").hide();
        $("#helpButton").click(help);
    }
    else
    {
        $("#helpButton").hide();
        $("#helpButton2").click(help2);
    }
}

function register(e) {
	window.location.href = "register";
}

function validate(e)
{
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	if (validateEmail(username)) {
    	if (validatePassword) {
    		//let the user login
    	}
    	else
    	{
    		//alert user that password was incorrect. 
    	}
	} 
	else
	{
		//alert user
	}
}

//Regex validation
function validateUsername(username) { 
    var re = /^[a-z0-9_-]{3,16}$/;
    return re.test(username);
} 

function validatePassword(password) { 
    var re = /^[a-z0-9_-]{6,18}$/;
    return re.test(password);
} 

function help(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    woopra.track("help_button_click_a");
    //window.location.href = "/help";
}

function help2(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    woopra.track("help_button_click_b");
    //window.location.href = "/help";
}

