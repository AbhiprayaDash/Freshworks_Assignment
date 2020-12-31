const repo= require('./repository')
const ttl=require('./timetolive')
const fs = require('fs')
const AsyncLock = require('node-async-locks').AsyncLock;
var lock = new AsyncLock();
class KeyvalueDatastore
{
    constructor(init)
    {
        //Initialize json file path
        var path;
        if(init)
        {
          path=init;
        }
        else{
          path='data.txt'
        }
        fs.writeFile(path, '', function (err) {
           if (err) throw err;
           console.log('Saved!');
         });
    };
      checkfilesize(path){
           var stats = fs.statSync(path)
           var fileSizeInBytes = stats.size;
           // Convert the file size to megabytes
           var sizeinmb = fileSizeInBytes / (1024*1024);
           if(sizeinmb>1000)
           {
               throw new Error('Size of file exceeded 1 GB');
           }
       }
       createkeyvaluepair(key,value){
           this.checkfilesize()
           const data=new Object(),
           email=key
           data[email]=value
           //check if key is already present
           const user=repo.findOneBy({
               checkkey:key 
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
                  //appending contents of file and new key value data
                  var fileout=JSON.parse(file)
                  fileout[email]=b
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
            //time to live property of key
                ttl.queuepush(req.body.mail)
                ttl.timeoutfunction()
                return;
           }
       }
       createkeyvaluedata(key,value)
       {
        lock.enter(createkeyvaluepair(key,value));
       }
      readkeydata(key)
      {
          //this function will check the size of file
          this.checkfilesize()
          //check if key is already present
          const user=repo.findOneBy({
             checkkey:key
          })
          if(user)
          {
            console.log('user found')
            console.log(user)
            return
          }  
          else{
            throw new Error('Invalid key');
          }
      }
      readkey(key)
      {
       lock.enter(readkeydata(key));
      }
      deletekeydata(key)
      {
          const user=repo.findOneBy({
              checkkey:key
           })
           if(user)
           {
              var file =new Object()
              file=fs.readFileSync('data.txt','utf8');
              var fileout=JSON.parse(file)
              delete fileout[req.body.mail]
              var outputfinal=JSON.stringify(fileout)
              fs.writeFileSync("data.txt", outputfinal, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                }
                console.log("deleted");
              });
           }
          else{
              throw new Error('User not exists');
          }
      }
      deletekey(key)
      {
        lock.enter(deletekeydata(key));
      }
  }