const mongoose = require('mongoose');
const initdata = require('./index.js');
const Listing = require('../models/listing.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb').catch((error) => {
        console.log(error);
    })
}

main().then(() => {
    console.log(`airbnb db is connected`);
})

let initdb = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj , owner : '67f12f234bd260b636e01a59'}));
    await Listing.insertMany(initdata.data);
}

initdb();