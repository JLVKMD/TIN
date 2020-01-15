var express = require('express');
var mongodb = require('mongodb');

var app = express();

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/posts', (req,res) => {
    res.send('posts');
});


app.get('/list', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/mySampleDB';
    var str = "";

    MongoClient.connect(url, {useUnifiedTopology: true,   useNewUrlParser: true,
    }, function(err, db) {
        
        const myDB = db.db('mySampleDB');
        var cursor = myDB.collection('redhat').find().toArray((err, result) => {
            if (err) return console.log(err)
            // renders index.ejs
            console.log(result)
            res.send(result);
          });
        // var cursor = myDB.collection('redhat').find();
        
        // cursor.each(function(err, doc) {
        //     if (doc != null) {
        //         str = str + "    Redhat name  " + doc.name + "</br>";
        //     }
            
        // });
        // res.send(str);

        db.close();
    }); 
});

  
  app.get('/newstudent', function (req, res){
    res.render('index.ejs');
  });
module.exports = app;

app.listen(3000);

/*
db.redhat.find()
db.redhat.find({version: {$gt: 6}})

db.redhat.deleteMany({release_date: "05/08/2014"});
db.redhat.insertOne({name:'Red Hat Enterprise Linux',product_name:'RHEL',type:'linux-x86_64',release_date:'05/08/2011',version:6})
db.redhat.updateMany({version: {$gt: 5}}, { $set: {name: "Edited"}})
*/