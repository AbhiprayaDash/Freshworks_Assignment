const express = require('express')
const router = express.Router();
const repo= require('./repository')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 5000
var jsonParser = bodyParser.json()

router.delete('/' ,jsonParser,async function (req, res,next){
    try{
      var stats = fs.statSync("data.txt")
      var fileSizeInBytes = stats.size;
      // Convert the file size to megabytes (optional)
      var sizeinmb = fileSizeInBytes / (1024*1024);
      if(sizeinmb>1000)
      {
         throw new Error('Size of file exceeded 1 GB');
      }
        const user=await repo.findOneBy({
             key:req.body.mail 
        })
       if(user)
       {
        var file =new Object()
        file=fs.readFileSync('data.txt','utf8');
        var fileout=JSON.parse(file)
        delete fileout[req.body.mail]
        var outputfinal=JSON.stringify(fileout)
        console.log(outputfinal)
        fs.writeFileSync("data.txt", outputfinal, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
        }
         console.log("saved");
         });
       }
       else{
           throw new Error('User not exists');
       }
   }
   catch (err) {
    next(err);
  }
})

module.exports=router;