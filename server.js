var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  path = require('path'),
  port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect('mongodb://noder:noder@apollo.modulusmongo.net:27017/anotu3Jy');

// configure bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongodb schema
var Schema = mongoose.Schema;
var LinkSchema = new Schema({
  url: String
});
var Link = mongoose.model('Link', LinkSchema);

// Assets
app.use(express.static(__dirname));


// routes
// show the home page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// get all the links
app.get('/api/links', function(req, res) {
  Link.find({}, function(err, links) {
    res.json(links);
  });
});

// add a link to the list
app.post('/api/links', function(req, res) {
  var link = new Link();
  link.url = req.body.url;

  link.save(function(err) {
    res.json({
      message: 'Successfully saved!'
    });
  });
});

// start server
app.listen(port);
console.log('App listening on ' + port);