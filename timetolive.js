const fs = require('fs')
const repo= require('./repository') 

function Queue(){
  this.elements=[];
}
let q= new Queue()
Queue.prototype.enqueue = function (e) {
this.elements.push(e);
};
// remove an element from the front of the queue
Queue.prototype.dequeue = function () {
return this.elements.shift();
};
// check if the queue is empty
Queue.prototype.isEmpty = function () {
return this.elements.length == 0;
};
// get the element at the front of the queue
Queue.prototype.peek = function () {
return !this.isEmpty() ? this.elements[0] : undefined;
};
Queue.prototype.length = function() {
return this.elements.length;
}

class Timetolive{
    constructor()
    {
      let q= new Queue()
    }  
    timetolive()
    {
        var file =new Object()
        file=fs.readFileSync('data.txt','utf8');
        if(!q.isEmpty())
        {
          var top=q.peek();
          q.dequeue(top)
          if(file)
          {
            var fileout=JSON.parse(file)
            const user=repo.findOneBy({
              key:top
           })
           if(user)
           {
            console.log('deleted')
            delete fileout[top]
           }
            var outputfinal=JSON.stringify(fileout)
            fs.writeFileSync("data.txt", outputfinal, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
              }
               console.log("saved");
            });
          }
        }
          return;
    }
     helperfunction() {
        this.timetolive()
      }
  timeoutfunction()
  {
    //key will have time to live property of 15 mins
    setTimeout(this.helperfunction,150000)
  }
  queuepush(a)
  {
    q.enqueue(a)
  }
}
  module.exports = new Timetolive() 