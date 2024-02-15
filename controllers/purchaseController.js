const Orders = require('../models/orders');
const RazorPay = require('razorpay');
const jwt = require('jsonwebtoken');

exports.purchasePremium = async (req, res, next) => {
    try {
        console.log('inside purprem')
        var rzp = new RazorPay({
            key_id: process.env.RZP_KEY_ID,
            key_secret: process.env.RZP_KEY_SECRET
        })
        const amount =  2500;

       const order = await rzp.orders.create({ amount, currency: "INR" })

       const newOrder = new Orders({
        orderid : order.id,
        status: 'PENDING',
        userId : req.user._id
       })

       newOrder.save();
            
            // await req.user.createOrder({ orderid: order.id, status: "PENDING" })

            return res.status(201).json({ order, key_id: rzp.key_id });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ error: err });
    }
}

function generateToken(id,ispremiumuser) {
    return jwt.sign({userId : id,ispremiumuser}, 'secretKey');
}


exports.updatetransactionstatus = async (req, res, next) => {
    try {
        const paymentId = req.body.payment_id;
        const orderId = req.body.order_id;

        const order = await Orders.findOneAndUpdate(
            {orderid : orderId},
            {paymentid : paymentId, status: 'SUCCESS'}
        );

        await req.user.updateOne({ispremiumuser : true});
        // const order = await Orders.findOne({ where: { orderid: orderId } })
        // const promise1 = order.update({ paymentid: paymentId, status: 'SUCCESS' })
        // const promise2 = req.user.update({ ispremiumuser: true });

        // await Promise.all([promise1,promise2]);
        console.log(req.user.ispremiumuser);
        return res.status(202).json({ message: "transaction successfull" ,token : generateToken(req.user.id,true)});

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.updatefailedstatus = async (req, res, next) => {
    try  {
        const orderId = req.body.order_id;
        const response = await Orders.findOneAndUpdate({orderid: orderId},{status:"failed"})
        await req.user.updateOne({ispremiumuser : false});
        // const response = await Orders.findOne({ where: { orderid: orderId } })
        // await response.update({ status: "failed" })
        // await req.user.update({ispremiumuser : false});
        return res.status(200).json({ message: "failed" });
    } catch (err) {
         console.log(err);
        return;
    }
}