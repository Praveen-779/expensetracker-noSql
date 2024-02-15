const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const auth = require('../middleware/auth');

router.get('/premiummembership', auth.authenticate, purchaseController.purchasePremium);
router.post('/updatetransactionstatus', auth.authenticate, purchaseController.updatetransactionstatus);
router.post('/updatefailedstatus', auth.authenticate, purchaseController.updatefailedstatus);

module.exports = router;