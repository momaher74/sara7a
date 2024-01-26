const express = require('express')
const app = express()
require('dotenv').config() 
const connectMongoose = require('./database/mongoose');
connectMongoose(); 
app.use(express.json()); 
    
app.use('/user', require('./routes/user_routes'))
app.use('/msg', require('./routes/messages_rotes')) 
app.get('/', (req, res) => res.send('Hello Demo page!'))
app.get('*', (req, res) => res.send('error 404 this page Not found'))
app.listen(process.env.port, () => console.log(`Example app listening on port !`))