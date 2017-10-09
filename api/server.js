// https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

var express = require('express'),
app = express(),
port = process.env.PORT || 5050,
mongoose = require('mongoose'),
Video = require('./models/videoModel'), //created model loading here
bodyParser = require('body-parser');
var cors = require('cors')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:mediaprojekti2017@ds135574.mlab.com:35574/videos/videoinfo'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var routes = require('./routes/videoRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);