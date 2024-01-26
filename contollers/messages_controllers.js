const { sendMail } = require('../emails/send_email');
const messageModel = require('../models/message_model') ; 
module.exports.sendMessage = (req, res)=>{
    const{msg, recieverId } = req.body;
    messageModel.insertMany({msg , recieverId}).then((msg)=>{
        res.status(200).json({status:"msg send successfully"  , msg})
    }).catch((error)=>{
        res.status(400).json({status:"msg send faild"  , error})
    });
};
module.exports.getMessage = (req, res)=>{
    const recieverId = req.id; 
    messageModel.find({recieverId}).then((msg)=>{
        res.status(200).json({status:"get messages successfully"  , msg})
    }).catch((error)=>{
        res.status(400).json({status:"get messages faild"  , error})
    });
};
