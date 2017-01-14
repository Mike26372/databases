var db = require('../db');
var msgUrl = '/classes/messages';

module.exports = {
  messages: {
    get: function (res, cb) {
      console.log('MODEL MESSAGE GET CALLED');
      // db.query('SELECT * FROM messages', function(err, rows, fields) {
      db.query('select * from messages inner join users on messages.id_users=users.id', function(err, rows, fields) {

        if (err) {
          console.error(err);
        } else {
          cb(rows);
          return rows;
        }
      });
    }, // a function which produces all the messages
    post: function (body) {
      console.log('MODEL MESSAGE POST CALLED');
      var message = body.message.replace(/'/g, "\\'");
      var user = body.username;
      var roomname = body.roomname.replace(/'/g, "\\'");

      var query = `insert into messages (id_users, message, roomname) 
                                values ((SELECT id from users where user='${user}' limit 1), 
                                '${message}', 
                                '${roomname}');`; 
      db.query(query, function(err, rows, fields) {
        if (err) {
          console.error(err);
        } else {
          return rows;
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log('MODEL USER GET CALLED');
      query = 'select * from users';
      // FINISH THIS

    },
    post: function (body) {
      console.log('MODEL USER POST CALLED');
      var user = body.username;
      var query = `insert ignore into users set user='${user}';`; 
      // db.connect();
      db.query(query, function(err, rows, fields) {
        if (err) {
          console.error(err);
        } else {
          return rows;
        }
      });
      // db.end();

    }
  },

  rooms: {
    // Ditto as above.
    get: function () {
      console.log('MODEL ROOMS GET CALLED');
      
    },
    post: function (body) {
      console.log('MODEL ROOMS POST CALLED');
      var roomname = body.roomname;
      var query = `insert ignore into rooms set roomname='${roomname}';`; 
      db.query(query, function(err, rows, fields) {
        if (err) {
          console.error(err);
        } else {
          return rows;
        }
      });
    }
  }
};

