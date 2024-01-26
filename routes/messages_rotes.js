const router = require('express').Router() ;  
const {sendMessage, getMessage} = require('../contollers/messages_controllers');
const { auth } = require('../middleware/auth');
const { msgValidation } = require('../middleware/validation');


router.post('/sendMsg', auth, msgValidation, sendMessage) ;
router.get('/getMsg', auth, getMessage) ; 

module.exports = router;    

