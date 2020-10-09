const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const Datastore = require('nedb');
const db = new Datastore({ filename: './dataFile', autoload: true });
const bodyParser = require("body-parser");
var cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/savePoints', (req, res) => {
  console.log(req.query)
  db.find({ issue: req.query.key }, function (err, docs) {
    res.send({status:200,data:docs})
  });
  
})

app.post('/savePoints',(req,res)=>{
    console.log(req.body);

    db.find({ issue: req.body.issue}, function (err, docs) {
        if(docs.length == 0){
            db.insert({...docs,...req.body}, function (err, newDoc) {  
                if(err){
                    res.send({status:400})
                }
                console.log(newDoc)
                res.send({status:200, newDoc}) 
            });
        }else{
            db.update({ issue: req.body.issue},{ $set: {"people":{...docs[0].people,...req.body.people}}}, function (err, newDoc) {  
                if(err){
                    res.send({status:400,error:err})
                    return;
                }
                console.log(newDoc)
                res.send({status:200}) 
            });
        }
    });
})

app.delete('/savePoints', (req, res) => {
    console.log(req.query)
    db.remove({ issue: req.query.key }, function (err, docs) {
      res.send({status:200,data:docs})
    });
    
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})