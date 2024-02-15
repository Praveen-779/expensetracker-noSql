var nodemailer = require('nodemailer');
const path = require('path');
const bcrypt = require('bcrypt');

const Forgetpasswordrequest = require('../models/forgotpasswordrequest');
const User = require('../models/user');

const { v4: uuidv4 } = require('uuid');

exports.forgetPasswordmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const uuid = uuidv4();
    const user = await User.findOne({ email: email } );

    if (user) {
      await Forgetpasswordrequest.create({ uuid: uuid, isactive: true,userId : user._id });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL,

          pass: process.env.MAIL_PASS
        }
      });

      const mailOptions = {
        from: 'bbab1910430@skdc.edu.in',
        to: email,
        subject: 'forget password',
        html: `<a href="http://localhost:7000/password/resetpassword/${uuid}">Reset Password</a>`
      };

      const info = await transporter.sendMail(mailOptions)
      return res.status(200).json({ success: true, uuid: uuid });
    }
    else throw new Error(error);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }

}

exports.resetpassword = async (req, res, next) => {

  try {
    const uuid = req.params.uuid;
    const response = await Forgetpasswordrequest.findOne( { uuid: uuid } );
    // const isActive = response.isactive;
    if (response) {
      await response.updateOne({ isactive: false });
      res.send(
        `<html>
        <form action="http://localhost:7000/password/updatepassword/${uuid}" >
        <label for="password">Enter New Password</label>
        <input type="password" name="password" id="password">
        <button type="submit">Reset Password</button>
        </form>
        
      </html>
      `)
    } else {
      res.send('404 Error')
    }
  } catch (err) {
    console.log(err);
  }
}

exports.updatepassword = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const password = req.query.password;
    console.log(uuid,password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await Forgetpasswordrequest.findOne({uuid:uuid})
    const user = await User.findOne( {_id:response.userId});

    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.updateOne({ password: hashedPassword });

    return res.status(200).json({ message: 'password changed succesfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};