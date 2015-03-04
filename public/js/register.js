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
    $("#backButton").click(projectClick);
    $("#newusername").keyup(checkUsername);
    $("#createUserButton").click(createUser);
}

function checkUsername()
{
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
}

function createUser(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    
    $("#existingUsername").text("");
    $("#contactExist").text("");
    $("#notMatching").text("");
    $("#nameExist").text("");
    $("#ageExist").text("");
    $("#genderExist").text("");
    
    var name = $("#name").val();
    var age = $("#age").val();
    var contact = $("#contact").val();
    var username = $("#newusername").val();
    var password = ($("#newpassword").val() == $("#newpassword2").val() ? $("#newpassword").val() : "");
    try
    {
        var gender = $(".btn.btn-default.active input")[0].value;
    }catch (err){var gender = "";}
    
    var valid = true;
    
    if (name == "")
    {
        $("#nameExist").text("Please enter your name.");
        valid = false;
    }
    if (age == "")
    {
        $("#ageExist").text("Please enter your age.");
        valid = false;
    }
    if (contact == "")
    {
        $("#contactExist").text("Please enter a contact number.");
        valid = false;
    }
    if (username == "")
    {
        $("#existingUsername").text("Please enter a username.");
        valid = false;
    }
    if (password == "")
    {
        $("#notMatching").text("Please re-enter passwords.");
        valid = false;
    }
    if (gender == "")
    {
        $("#genderExist").text("Please select your gender.");
        valid = false;
    }
    
    function accountCreated(valid)
    {
        if (valid)
        {
            var d = new Date();
            var exdays = 1;
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            
            document.cookie = "gymBuddyUser=" + username + "; " + expires;
            window.location.href = "/myProfiles";
        }
        
    }
    
    if (valid)
        $.get('/newUser/' + name + '/' + age + '/' + gender + '/' + contact + '/' + username + '/' + password, accountCreated);
    
}

function projectClick(e) {
    // Cancel the default action, which prevents the page from reloading
    e.preventDefault();
    window.location.href = "/";
}