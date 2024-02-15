const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    amount : {
        type: Number
    },
    description : String,

    category : String,

    userId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Expense',ExpenseSchema)



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Expense = sequelize.define('Expense', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },

//     amount: Sequelize.INTEGER,

//     description: Sequelize.STRING,

//     category: Sequelize.STRING
// })

// module.exports = Expense;