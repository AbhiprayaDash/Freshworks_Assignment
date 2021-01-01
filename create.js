const ttl=require('./timetolive')
const fs = require('fs')
const AsyncLock = require('node-async-locks').AsyncLock;
var lock = new AsyncLock();
var path;
class KeyvalueDatastore
{
    constructor(init)
    {
        //Initialize json file path
        if(init)
        {
          path=init;
        }
        else{
          path='data.txt'
        }
        const repo= require('./repository')(path)
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
       createkeyvaluedata(key,value){
           this.checkfilesize()
           lock.isLocked();
           lock.enter(function(innerToken){
           const data=new Object(),
           email=key
           data[email]=value
           //check if key is already present
           const user=repo.findOneBy({
               checkkey:key,path
           })
           if(user)
           {
               throw new Error('User already exists');
           }
           else{
               var jsonContent=JSON.stringify(data)
               var file =new Object()
               file=fs.readFileSync(path,'utf8');
               if(!file)
               {
                  fs.writeFileSync(path, jsonContent, 'utf8', function (err) {
                  if (err) {
                     console.log("An error occured while writing JSON Object to File.");
                  }
                  console.log("saved");
               });
              }
              else{
                  //appending contents of file and new key value data
                  var fileout=JSON.parse(file)
                  fileout[email]=value
                  var output = {};
                  output = Object.assign(fileout, data)
                  var outputfinal=JSON.stringify(output)
                  fs.writeFileSync(path, outputfinal, 'utf8', function (err) {
                  if (err) {
                      console.log("An error occured while writing JSON Object to File.");
                  }
                  console.log("saved");
                   });
              }
            //time to live property of key
                ttl.queuepush(value)
                ttl.timeoutfunction()
                lock.isLocked();
                lock.leave(innerToken)
                return;
           }
          });
       }
      readkey(key)
      {
          //this function will check the size of file
          this.checkfilesize()
          //check if key is already present
          lock.isLocked();
          lock.enter(function(innerToken){
          const user=repo.findOneBy({
             checkkey:key,path
          })
          if(user)
          {
            console.log('user found')
            console.log(user)
          }  
          else{
            throw new Error('Invalid key');
          }
          lock.isLocked();
          lock.leave(innerToken)
          return
        });
      }
      deletekey(key)
      {
        lock.isLocked();
        lock.enter(function(innerToken){
          const user=repo.findOneBy({
              checkkey:key,path
           })
           if(user)
           {
              var file =new Object()
              file=fs.readFileSync(path,'utf8');
              var fileout=JSON.parse(file)
              delete fileout[req.body.mail]
              var outputfinal=JSON.stringify(fileout)
              fs.writeFileSync(path, outputfinal, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                }
                console.log("deleted");
              });
           }
          else{
              throw new Error('User not exists');
          }
          lock.isLocked();
          lock.leave(innerToken)
        });
      }
  }
  module.exports =(init)=>{return new KeyvalueDatastore(init)}