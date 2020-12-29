class Datastore{
    create(key,value){
       
        try{
            const data={
                var emailreq.body.password
            }
            data[email]=req.body.mail
            const user=await repo.findOneBy({
                 d:data
            })
              if(user==null)
              {
                throw new Error('User already exists');
              }
              else{
                var jsondata={
                key1:req.body.password,
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
    }
}