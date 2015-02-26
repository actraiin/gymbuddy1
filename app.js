
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');


var index = require('./routes/index');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var myprofiles = require('./routes/myprofiles');
var login = require('./routes/login');
var newUser = require('./routes/newUser');
var addProfile = require('./routes/addProfile');
var userdata = require('./routes/userdata');
var saveProfile = require('./routes/saveProfile');
var deleteProfile = require('./routes/deleteProfile');
var help = require('./routes/help');

// Example route
// var user = require('./routes/user');

var local_database_name = 'gymbuddy';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/login', login.login);
app.get('/newUser', newUser.registerNewUser);
app.get('/register', register.registerNewUser);
app.get('/dashboard', dashboard.viewDashboard);
app.get('/dashboard/:username', dashboard.viewMatches);
app.get('/myprofiles', myprofiles.viewMyprofiles);
app.get('/myprofiles/:username', myprofiles.viewProfiles);
app.get('/myprofiles/:username/:pNum', myprofiles.fetchProfile);
app.get('/addProfile', addProfile.addProfile);
app.get('/addProfile/:username', addProfile.add);
app.get('/userdata', userdata.userdata);
app.get('/saveProfile', saveProfile.saveProfile);
app.get('/saveProfile/:username', saveProfile.save);
app.get('/deleteProfile', deleteProfile.deleteProfile);
app.get('/help',help.viewHelp);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
