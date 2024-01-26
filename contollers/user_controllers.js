const userModel = require('../models/user_model');
const jwt =  require('jsonwebtoken'); 
const bcrypt =require('bcrypt');
const { sendMail } = require('../emails/send_email');

module.exports.signup = async (req , res)=>{
    const {name , email , password , age , image } = req.body ;
    const emailConfirm = false ;
    const exist_user = await userModel.findOne({email}) ; 
    if(exist_user){
        res.status(400).json({msg:"this email existed aleardy try another one"}) ;
    }else{
        bcrypt.hash(password , 5 ,  (error, hashedPassword)=>{
            if(error){
                res.status(400).json({msg:"user signed up failed" }) ;
            }else{
                userModel.insertMany({name:name ,email:email , password:hashedPassword , image:image , age:age , emailConfirm : emailConfirm}).then(async(user)=>{
                    const token = await jwt.sign({email , name , image , age  , id:user._id , emailConfirm}, 'p_key') ; 
                    sendMail({token})
                    res.status(201).json({msg:"user signed up successfuly", user , token:token });
                }).catch((error)=>{
                    res.status(400).json({msg:"user signed up failed"  , error}) ;
                });
            } 
        }) 
    }
   
}
module.exports.signin = (req,res)=>{
      const{email, password} = req.body ;
    userModel.findOne({email}).then(async(user)=>{
        let match = bcrypt.compare(password , user.password) ; 
        if(match){
            const token = await jwt.sign({email, id:user._id}, 'p_key') ;
            res.status(201).json({msg:"user signed in successfuly", user , token:token });             
        }else{
            res.status(400).json({msg:"cann't sign in password is incorrect"}) ;   
        }
    }).catch((error)=>{
        res.status(400).json({msg:"cann't find this email pls try again" , error}) ;
    }); 
}


module.exports.verifayEmail = async(req , res)=>{
    let {token} =   req.params;
    await jwt.verify(token , 'p_key' , (error , user)=>{
        const email = user.email ;
     if(error){
        res.status(400).json({error:"this token invalid " , error})
     }else{
        if(email){
            userModel.findOneAndUpdate({ email },{emailConfirm:true} , {new:true}).then((user)=>{
                res.json({msg:'thanks your email verified'})
            }).catch((error)=>{
              res.status(404).json({msg:'** can\'t find this email ' ,error})
            })  
          } else{
              res.status(404).json({msg:'can\'t find this email '})
          }
     }});   
     
}