var User = require('./model/user.js')
var Datastore = require('nedb')
var db = new Datastore()
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var utils = require('../src/utils');
module.exports = function (app) {
  // app.post("/haha",verifyToken, (req, res) => {
  //   // const customers = [
  //   //   { id: 1, firstName: 'John111', lastName: 'Doe' },
  //   //   { id: 2, firstName: 'Brad111', lastName: 'Traversy' },
  //   //   { id: 3, firstName: 'Mary111', lastName: 'Swansonâ' },
  //   // ];
  //   // res.send(customers)
  //   req.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IjEyMyIsInJvbGVzIjoxMjMsIl9pZCI6IjViYTBiOTk5OTY2YzMyMmU0YzU4YjgyZCIsImVtYWlsIjoiMTIzIiwicGhvbmUiOjEyMywiaWF0IjoxNTM3NzU2OTUyLCJleHAiOjE1Mzc4NDMzNTJ9.UaYP-Vy5zn1nfO1G3mr3luS64swp8yFofh10cd_ntqk"
  //   console.log(req.token)
  //   jwt.verify(req.token, 'Bearer ', (err, authData) => {
  //     if(err) {
  //       res.sendStatus(403);
  //     } else {
  //       res.json({
  //         message: 'Post created...',
  //         authData
  //       });
  //     }
  //   });

  //   //res.json(customers);
  // })
  //-----------------------------------------------------

  app.post("/fetch-data", verifyToken, (req, res) => {
    // const customers = [
    //   { id: 1, firstName: 'John111', lastName: 'Doe' },
    //   { id: 2, firstName: 'Brad111', lastName: 'Traversy' },
    //   { id: 3, firstName: 'Mary111', lastName: 'Swansonâ' },
    // ];
    // res.send(customers)
    console.log("tooooooookkkkkkkkennnnnnnn",req.body.token)
    // req.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IjEyMyIsInJvbGVzIjoxMjMsIl9pZCI6IjViYTBiOTk5OTY2YzMyMmU0YzU4YjgyZCIsImVtYWlsIjoiMTIzIiwicGhvbmUiOjEyMywiaWF0IjoxNTM3ODQ3MjUxLCJleHAiOjE1Mzc5MzM2NTF9.3b7y_hGpxhyRNy2RjefgEiSeCDpnoWRekePb0M1t--E"
    //req.body.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IjEyMyIsInJvbGVzIjoxMjMsIl9pZCI6IjViYTBiOTk5OTY2YzMyMmU0YzU4YjgyZCIsImVtYWlsIjoiMTIzIiwicGhvbmUiOjEyMywiaWF0IjoxNTM3ODQ3MjUxLCJleHAiOjE1Mzc5MzM2NTF9.3b7y_hGpxhyRNy2RjefgEiSeCDpnoWRekePb0M1t--E"
    var token = req.body.token || req.query.token;
    if (!token) {
      return res.status(401).json({ message: 'Must pass token' });
    }

    // Check token that was passed by decoding token using secret
    jwt.verify(token, "Bearer ", function (err, user) {
      if (err) throw err;
      //return user using the id from w/in JWTToken
      // console.log(" ")
      User.findById({
        _id: user._id
      }, function (err, user) {
        if (err) throw err;
        user = utils.getCleanUser(user);
        //Note: you can renew token by creating new token(i.e.    
        //refresh it)w/ new expiration time at this point, but I’m 
        //passing the old token back.
        // var token = utils.generateToken(user);
        res.json({
          user: user,
          token: token
        });
      });
    });
  });
  app.get("/:username/:password/:configpws", (req, res) => {
    var newUser = new User();
    newUser.usrname = req.params.username;
    newUser.pws = req.params.password;
    newUser.configpws = req.params.configpws;
    console.log("Register user success!!" + newUser.usrname + "  " + newUser.pws);
    newUser.save((err) => {
      if (err)
        throw err;
    })
    res.send("success!!");
  })
  app.post('/users/login', function (req, res) {
    User.findOne({ usrname: req.body.username })
      .exec(function (err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong'
          });
        }
        bcrypt.compare(req.body.password.trim(), user.pws,
          function (err, valid) {
            console.log(valid)
            if (!valid) {
              return res.status(404).json({
                error: true,
                message: 'Username or Password is Wrong'
              });
            }
            var token = utils.generateToken(user);
            user = utils.getCleanUser(user);    //xóa password gửi vào trong dữ liệu
            res.json({
              user: user,
              token: token
            });
          });
      });
  });

  app.post('/users/signup', function (req, res) {
    var body = req.body;
    console.log(body.username);
    console.log("hahaha", req.user)
    var hash = bcrypt.hashSync(body.password.trim(), 10);
    var newUser = new User();
    newUser.usrname = body.username;
    newUser.pws = hash;
    newUser.configpws = hash;
    newUser.fullname = body.fullname;
    newUser.email = body.email;
    newUser.phone = body.phone;
    newUser.is_delete = 0;
    newUser.roles = body.roles;
    newUser.create_at = new Date();
    console.log("Register user success!!" + newUser.usrname + "  " + newUser.pws);
    newUser.save((err) => {
      if (err)
        throw err;
      var token = utils.generateToken(newUser);
      console.log("token", token)
      res.json({
        user: newUser,
        token: token
      });
    })

    //res.send(req.body)
  });

  db.insert([{ text: 'Get to the choppah!' }])

  app.get("/*", function (req, res) {
    res.sendFile(__dirname + '/index.html')
  })

  app.post("/fetch-todos", function (req, res) {
    db.find({}, function (err, docs) {
      res.send(docs.map(function (doc) { return { id: doc._id, text: doc.text } }))
    })
  })

  app.post("/add-todo", function (req, res) {
    db.insert([{ text: req.body.text }], function (err, newDocs) {
      res.send(newDocs[0])
      console.log(newDocs)
    });
  })

  app.post("/edit-todo", function (req, res) {
    db.update({ _id: req.body.id }, { text: req.body.text }, { returnUpdatedDocs: true }, function (err, numAffected, doc, upsert) {

      res.send({ text: doc.text, id: doc._id })
    });
  })

  app.post("/complete-todo", function (req, res) {
    db.findOne({ _id: req.body.id }, function (err, doc) {
      db.update({ _id: req.body.id }, { completed: !doc.completed }, { returnUpdatedDocs: true }, function (err, numAffected, doc, upsert) {
        res.send({ text: doc.text, id: doc._id, completed: doc.completed })
      })
    })
  })

  app.post("/complete-all", function (req, res) {
    db.find({}, function (err, docs) {
      const areAllMarked = docs.every(todo => todo.completed)

      db.update({}, { completed: !areAllMarked }, { returnUpdatedDocs: true }, function (err, numAffected, doc, upsert) {
        res.send({})
      })
    })
  })

  app.post("/clear-completed", function (req, res) {
    db.remove({ completed: true }, { multi: true }, function (err, numRemoved) {
      res.send(numRemoved);
    });
  })
  function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) return next();

    token = token.replace('Bearer ', '');
    jwt.verify(token, "Bearer ", function (err, user) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Please register Log in using a valid email to submit posts'
        });
      } else {
        req.user = user;
        next();
      }
    });
  }
  app.post("/delete-todo", function (req, res) {
    db.remove({ _id: req.body.id }, function (err, numRemoved) {
      res.send({})
    });
  })
}