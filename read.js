const express = require('express')
const router = express.Router();
const repo= require('./repository')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 5000
var jsonParser = bodyParser.json()
router.post('/' ,jsonParser,async function (req, res,next){
    try{
        const user=await repo.findOneBy({
             key:req.body.mail
        })
       if(user)
       {
         console.log(user);
       }  
       else{
          throw new Error('Invalid key');
       }
    }
    catch (err) {
     next(err);
   }
})

module.exports=router;