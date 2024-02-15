const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try  {
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token, 'secretKey');
        const user = await User.findOne({_id : decodedToken.userId});
        console.log(user);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ err: err });
    }
}

module.exports = { authenticate };