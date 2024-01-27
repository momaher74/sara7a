const router = require('express').Router();
const {signin , signup, verifayEmail , visitProfile} = require('../contollers/user_controllers');
const {signinValidation, signupValidation } = require('../middleware/validation'); 

router.post('/signup', signupValidation, signup); 
router.post('/signin',signinValidation,signin);
router.get('/verify/:token', verifayEmail);
router.get('/visit/:token',  visitProfile);

module.exports=router;
