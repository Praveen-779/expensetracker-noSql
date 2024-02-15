const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!name || !email || !password) {
           return res.status(500).json({ message: 'Fill in all data' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const user = new User({
            name : name,
            email: email,
            password: hashedPassword
        })
        await user.save();

        // const response = await User.create({
        //     name: name,
        //     email: email,
        //     password: hashedPassword
        // });

        res.status(200).json({ response: user });
    } catch (err) {
        res.status(403).json({ err: err });
    }
};

function generateToken(id,ispremiumuser) {
    return jwt.sign({userId : id,ispremiumuser}, 'secretKey');
}

exports.postLogin = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    if( !email || !password) {
        res.status(400).json({error : 'fill in all data'});
    }

    try {
        const user = await User.findOne({email : email}).exec();
        if(!user) {
           return res.status(404).json({message : 'user not found'});
        }
        
        if(user.email === email) {
            const bcryptPassword = await bcrypt.compare(password,user.password);
            if(bcryptPassword) {
                res.status(200).json({message : 'user login in successfully',token : generateToken(user._id,user.ispremiumuser)});
            }
            else {
                res.status(401).json({message : 'password incorrect'});
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({err : err}) ;
    }
}