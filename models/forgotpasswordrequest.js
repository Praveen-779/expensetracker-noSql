const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForgetpasswordrequestSchema = new Schema({
    uuid : String,

    isactive : Boolean,

    userId : {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('ForgetPasswordRequest',ForgetpasswordrequestSchema)

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Forgetpasswordrequest = sequelize.define('forgotpasswordrequest', {
//     id: {
//         type: Sequelize.STRING,
//         autoIncrement: false,
//         allowNull: false,
//         primaryKey: true
//     },

//     isactive: Sequelize.BOOLEAN
// })

// module.exports = Forgetpasswordrequest;