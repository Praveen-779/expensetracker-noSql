const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('sequelize');

exports.getLeaderBoard = async function (req, res, next) {
    try {
        console.log('inside leaderboard')
        const leaderBoard = await User.find()
        .sort({totalexpense: -1}) // sort in desc order
        .exec() 
            // attributes: ['name', 'totalexpense'],
            // order: [['totalexpense', 'DESC']]
            console.log(leaderBoard)
        
     res.status(200).json({ leaderBoard: leaderBoard });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}