

// _id: 5c5a9c66b6561a07c421ee94

// 12 bytes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter
//-----------------------------------
    // 12 bytes

// 1 byte = 8 bits (binary: either a 0 or 1)

// How many numbers can we represent in 
// 1 byte = 8 bits
// answer:
// 2 ^ 8 = 256 
// --> with 1 byte we can store 256 numbers
// with 3 bits...
// 2 ^ 24 = 16M

//-----------------------------------------

// the id is generated from MongoDb Driver
// Mongoose talks to the driver

// the driver itself can generate an almost unique id.
// You can explicity generate an ID if you wan to...
const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id);  // --> 5c5a9c66b6561a07c421ee94

// id is generated in memory.
// the id object objectId has a method for getting the time stamp...
const timeStamp = id.getTimestamp();
console.log(timeStamp);

// There is a static method for validating object Ids..
const isValid = mongoose.Types.ObjectId.isValid('5c5a9c66b6561a07c421ee94');
console.log(isValid);




