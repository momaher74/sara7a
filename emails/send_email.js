const nodemailer = require('nodemailer') ; 
const jwt = require('jsonwebtoken');
const { verifayEmail } = require('../contollers/user_controllers');
module.exports.sendMail= async(token)=>{

    let user ;  
   await jwt.verify(token.token , 'p_key' , (error , decoded)=>{
    if(error){
       console.log('errrrrror' ,error);
    }else{
        user = decoded ;
    }});
    const transporter = nodemailer.createTransport({
      service:'gmail' , 
        auth: {
            user: 'elomdamohamedmaher@gmail.com',
            pass: 'kgky lyuk zeas lpzm'
        }
    });
     transporter.sendMail({
        from: '"Sara7a Manger" <elomdamohamedmaher@gmail.com>',
        to: user.email, 
        subject: "verifay your email now ✔", 
        text: "verifay your email to be safe", 
        html: `<a href="http://localhost:3030/user/verify/${token.token}"> Verifay 1<br>`, 
      },(error , info)=>{
        if(error){
            console.log('error' , error);
        }else{
            console.log('start verifying this acc' , info);
        }
      });
}