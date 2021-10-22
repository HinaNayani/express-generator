var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://HinaNayani:insiyasakina@cluster0.6wlka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/* GET users listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('node-demo');
      const collection = db.collection('users');
      collection
        .find()
        .toArray()
        .then((results) => {
          res.render('index.ejs', { users: results });
        })
        .catch((error) => {
          res.redirect('/');
        });
    });
  });

//create
router.post('/add', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .insertOne(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});

// router.get('/inner', function(req, res, next) {
//   res.send('Inner user');
// });
module.exports = router;
