const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
}

const initDB = async()=>{
   await listing.deleteMany({});
   await listing.insertMany(initData.data);
   console.log("Data initialized");
};

initDB();