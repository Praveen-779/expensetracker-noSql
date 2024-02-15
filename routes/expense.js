const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/add-expense', auth.authenticate, expenseController.addExpense);


router.delete('/delete/:id', auth.authenticate, expenseController.deleteExpense);

router.get('/download', auth.authenticate, expenseController.downloadExpense);

router.get('/downloadedexpense', auth.authenticate, expenseController.getDownloadedExpense);

router.get('/pagination/:pagesize', auth.authenticate, expenseController.pagination)

module.exports = router;
