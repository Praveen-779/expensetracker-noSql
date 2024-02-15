const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DownloadedExpenseSchema = new Schema({
    date: String,
    url : String,
    userId : {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('DownloadedExpense',DownloadedExpenseSchema);
// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const DownloadedExpense = sequelize.define('downloadedexpense', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },

//     date: Sequelize.STRING,
//     url: Sequelize.STRING
// })

// module.exports = DownloadedExpense;