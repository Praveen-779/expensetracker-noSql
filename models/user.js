const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ispremiumuser : {
        type: Boolean,
    },
    totalexpense : {
        type: Number
    }
})

module.exports = mongoose.model('User',userSchema);





// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },

//     name: Sequelize.STRING,

//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: Sequelize.STRING,
//     ispremiumuser: Sequelize.BOOLEAN,
//     totalexpense: Sequelize.INTEGER
// })

// module.exports = User;