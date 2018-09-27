var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
// var Datastore = require('nedb')
// var db = new Datastore()
const mongoose = require('mongoose');
var configDB=require("./config/database.js");
mongoose.connect(configDB.url);
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')

var app = new express()
var port = process.env.PORT || 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');


  jwt.verify(token, "Bearer ", function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    } else {
      res.json(user)
      req.user = user;
      next();
    }
  });

});
require("./app/router")(app);
// insert first doc to data store
// db.insert([{ text: 'Get to the choppah!' }]) 

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

// app.post("/fetch-todos", function(req, res) {
//   db.find({}, function(err, docs) {
//     res.send(docs.map(function(doc) { return { id: doc._id, text: doc.text }}))
//   })
// })

// app.post("/add-todo", function(req, res) {
//   db.insert([{ text: req.body.text }], function (err, newDocs) {
//     res.send(newDocs[0])
//     console.log(newDocs)
//   });
// })

// app.post("/edit-todo", function(req, res) {
//   db.update({ _id: req.body.id }, {text: req.body.text}, { returnUpdatedDocs: true },  function (err, numAffected, doc, upsert) {
    
//     res.send({ text: doc.text, id: doc._id })
//   });
// })

// app.post("/complete-todo", function(req, res) {
//   db.findOne({ _id: req.body.id }, function (err, doc) {
//     db.update({ _id: req.body.id }, {completed: !doc.completed}, { returnUpdatedDocs: true },  function (err, numAffected, doc, upsert) { 
//       res.send({ text: doc.text, id: doc._id, completed: doc.completed })
//     })
//   })
// })

// app.post("/complete-all", function(req, res) {
//   db.find({ }, function (err, docs) {
//     const areAllMarked = docs.every(todo => todo.completed)

//     db.update({ }, {completed: !areAllMarked}, { returnUpdatedDocs: true }, function (err, numAffected, doc, upsert) { 
//       res.send({ })
//     })
//   })
// })

// app.post("/clear-completed", function(req, res) {
//   db.remove({ completed: true }, { multi: true }, function (err, numRemoved) {
//     res.send(numRemoved);
//   });
// })

// app.post("/delete-todo", function(req, res) {
//   db.remove({ _id: req.body.id }, function (err, numRemoved) {
//     res.send({ })
//   });
// })

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
