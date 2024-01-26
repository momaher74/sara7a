const mongoose = require('mongoose');

const connectMongoose = ()=>{
    mongoose.connect("mongodb+srv://momaher:momaher123456@cluster0.zvnfn4z.mongodb.net/sara7adb").then((_)=>{
    console.log('mongoose connected')
}).catch((error)=>{
    console.log('mongoosed error', error) ;
})
}
module.exports = connectMongoose ;
