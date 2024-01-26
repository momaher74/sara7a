const jwt = require('jsonwebtoken'); 
module.exports.auth=(req, res, next)=>{
  const token = req.header('token'); 
  jwt.verify(token,'p_key' ,(error , decoded)=>{
    if(error){
        res.status(400).json({msg:"this token incorrect"}) ;
    }else{
        req.id = decoded.id;
       next();
    }}); 
};
