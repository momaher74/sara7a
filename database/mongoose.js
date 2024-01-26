const mongoose = require('mongoose');

const connectMongoose = ()=>{
    mongoose.connect(process.env.url).then((_)=>{
    console.log('mongoose connected')
}).catch((error)=>{
    console.log('mongoosed error', error) ;
})
}
module.exports = connectMongoose ;