const express = require('express');
const router = express.Router();
const forgetpasswordController = require('../controllers/forgetpasswordController');

router.post('/forgetpassword', forgetpasswordController.forgetPasswordmail)
router.get('/resetpassword/:uuid', forgetpasswordController.resetpassword);
router.use('/updatepassword/:uuid', forgetpasswordController.updatepassword);

module.exports = router;