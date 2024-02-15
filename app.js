const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders')
const Forgotpasswordrequest = require('./models/forgotpasswordrequest');
const DownloadedExpense = require('./models/downloadedexpense');

const app = express();

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium');
const forgetpasswordRoutes = require('./routes/forgetpassword');
const Forgetpasswordrequest = require('./models/forgotpasswordrequest');

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags : 'a'});

app.use(cors());
app.use(express.json());
app.use( helmet({ contentSecurityPolicy: false }) );
// app.use(morgan('combined', {stream: accessLogStream}));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password',forgetpasswordRoutes);

// app.use('/', (req, res) => {
//     console.log(`${req.url}`);
//     const filePath = path.join(__dirname, 'views', `${req.url}`);
//     res.sendFile(filePath);
// });

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Forgotpasswordrequest);
// Forgetpasswordrequest.belongsTo(User);

// User.hasMany(DownloadedExpense);
// DownloadedExpense.belongsTo(User);
// console.log(process.env.PORT)

mongoose
  .connect(
    'mongodb+srv://praveenpravi779:yyO3yd1jKBOIJ0ry@cluster0.nmphjgg.mongodb.net/expensetracker'
  )
  .then(result => {
    app.listen(7000);
    console.log('server started')
  })
  .catch(err => {
    console.log(err);
  })