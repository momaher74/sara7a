const joi = require('joi') ; 
module.exports.signupValidation = (req, res, next)=>{
    const user_val = joi.object({
        name:joi.string().required().min(5).max(20) ,
        email:joi.string().email().required().min(15).max(80) , 
        password:joi.string().required().min(6).max(20), 
        age:joi.number().required().min(8),
        image:joi.string().min(5).max(150),
        }); 
    const { error } = user_val.validate(req.body , {abortEarly:false}) ; 
    if(error){
            res.status(400).json({msg :"your data is invalid "  , error : error['details']})
    }else{
            next();
    }
};
module.exports.signinValidation = (req, res, next)=>{
    const user_val = joi.object({
        email:joi.string().email().required().min(15).max(80) , 
        password:joi.string().required().min(6).max(20), 
        }); 
    const {error} = user_val.validate(req.body , {abortEarly:false}) ; 
    if(error){
            res.status(400).json({msg :"your data is invalid "  , error : error['details']})
    }else{
            next();
    }
};

module.exports.msgValidation = (req, res, next)=>{
    const msg_val = joi.object({
        msg:joi.string().required().min(1).max(200), 
        recieverId:joi.string().required().min(1)
        }); 
    const {error} = msg_val.validate(req.body , {abortEarly:false}) ; 
    if(error){
            res.status(400).json({msg :"your data is invalid "  , error : error['details']})
    }else{
             next();
    }
};