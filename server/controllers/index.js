var models = require('../models');
// var parser = require('body-parser');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(res, function(err, data) {
        if (err) {
          console.err(err);
          res.status(404).end();
        } else {
          var stuff = JSON.stringify(data);
          stuff = JSON.parse(stuff);
          res.status(200).end(JSON.stringify({results: stuff}));  
        }
      });      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.status(201).end();
    } // a function which handles posting a message to the database
  },  

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.body);
      res.status(200).end();
    },
    post: function (req, res) {
      // MAKE POST REQUEST FOR USERNAME
      models.users.post(req.body);
      res.status(201).end();
    }
  }
};

