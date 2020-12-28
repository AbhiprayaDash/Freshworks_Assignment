const express = require('express')
const repo= require('./repository')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 5000
var jsonParser = bodyParser.json()
app.post('/create' ,jsonParser,async function (req, res,next){
    try{
     const user=await repo.findOneBy({
          email:req.body.mail,
     })
       if(user==null)
       {
         throw new Error('User already exists');
       }
       else{
         var jsondata={
         
       };
       var jsonContent=JSON.stringify(jsondata);
       fs.appendFile("datastore.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("saved");
     });
    }
   }
   catch (err) {
    next(err);
  }
})

app.get('/getrequest' ,async function (req, res,next){
    console.log('created');
    return;
})
app.listen(port, () => { 
    console.log(`Server start on port ${port}`) 
  }) 