const Expense = require('../models/expense')

exports.getExpenses = (req, where) => {
    console.log("inside services");
    return Expense.find(where);
    // return req.user.getExpenses(where);
}