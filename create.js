const express = require('express')
const repo= require('./repository')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 5000
var jsonParser = bodyParser.json()

app.use(express.json({extended:false}));
//Define Routes
app.use('/read',require('./read'));
app.use('/delete',require('./delete'));
app.post('/create' ,jsonParser,async function (req, res,next){
    try{
      var stats = fs.statSync("data.txt")
      var fileSizeInBytes = stats.size;
      // Convert the file size to megabytes (optional)
      var sizeinmb = fileSizeInBytes / (1024*1024);
      if(sizeinmb>1000)
      {
         throw new Error('Size of file exceeded 1 GB');
      }
        const data=new Object(),
        email=req.body.mail
        data[email]=req.body.password
        const user=await repo.findOneBy({
             key:req.body.mail 
        })
       if(user)
       {
         throw new Error('User already exists');
       }
       else{
       var jsonContent=JSON.stringify(data)
       var file =new Object()
       file=fs.readFileSync('data.txt','utf8');
       if(!file)
       {
        fs.writeFileSync("data.txt", jsonContent, 'utf8', function (err) {
          if (err) {
              console.log("An error occured while writing JSON Object to File.");
          }
           console.log("saved");
        });
       }
       else{
       var fileout=JSON.parse(file)
       fileout[email]=req.body.password
       console.log(file)
       var output = {};
       output = Object.assign(fileout, data)
       var outputfinal=JSON.stringify(output)
       fs.writeFileSync("data.txt", outputfinal, 'utf8', function (err) {
       if (err) {
           console.log("An error occured while writing JSON Object to File.");
       }
        console.log("saved");
     });
    }
  }
   }
   catch (err) {
    next(err);
  }
})

app.listen(port, () => { 
    console.log(`Server start on port ${port}`) 
  }) 