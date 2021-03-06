// Importing node.js file system, 
// crypto module 
const fs = require('fs') 
const crypto = require('crypto') 

class Repository { 
	constructor(filename) { 

		// The filename where datas are 
		// going to store 
		if (!filename) { 
			throw new Error('Filename is '
				+ 'required to create a datastore!') 
		} 
		this.filename = filename 
		try { 
			fs.accessSync(this.filename) 
		} catch (err) { 

			// If file not exist, It is 
			// created with empty array 
			fs.writeFileSync(this.filename, '[]') 
		} 
	} 

	async findOneBy(attrs) { 

		// Read all file contents of 
		// the datastore 
		this.filename=attrs.path
		const jsonRecords = await 
			fs.promises.readFile(this.filename, { 
			encoding: 'utf8'
        }) 
		// Parsing json records in javascript 
        // object type records 
        if(!jsonRecords)
        {
        return null
        }
        else{
            var keys=attrs.checkkey
            var parsedjson=JSON.parse(jsonRecords)
        // Iterating through each record 
        if(parsedjson.hasOwnProperty(attrs.checkkey)){
            //define here
            return keys
        }
        return null
        } 
  
        // If record not found 
    } 
    } 

// The 'datastore.json' file created 
// at runtime if it not exist here we 
// try to fetch information from 
// database using some properties 
// that means database(datastore.json) 
// already exist and there are also 
// records in it. 
module.exports =(filename)=>{return new Repository(filename)}
