const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    paymentid : String,
    orderid: String,
    status: String,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Order',orderSchema);



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Orders = sequelize.define('orders', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING

// })

// module.exports = Orders;