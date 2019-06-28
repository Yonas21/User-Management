const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const multer = require('multer');
const expressMailer = require('express-mailer');

let userRouter = require("./routes/user.router");
let productRouter = require("./routes/products.router");
let orderRouter = require("./routes/orders.router");
let wish_listRouter = require("./routes/wishlist.router");
let cartRouter = require('./routes/cart.router');
let reviewRouter = require('./routes/review.router');
let mallRouter = require('./routes/mall.router');
let shopRouter = require('./routes/shop.router');
let commentRouter = require('./routes/comment.route');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(
    () => {
        console.log("Database is connected");
    },
    err => {
        console.log("Can not connect to the database" + err);
    }
);

const DIR = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({storage: storage});

// ALLOW ACCESS HEADERS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access-token');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/wish_lists", wish_listRouter);
app.use("/carts", cartRouter);
app.use('/review', reviewRouter);
app.use('/shop', shopRouter);
app.use('/mall', mallRouter);
app.use('/comment', commentRouter);

app.post('/api/upload', upload.single('photo') ,(req, res, next) => {
    if (!req.file) {
        console.log('file not received');
        return res.send({
            success: false
        })
    } else {
        console.log('file received');
        res.send({
            success: true
        })
    }
});
//the email that should be sent should extend the message.
expressMailer.extend(app, {
    from: 'yonasalem056@gmail.com',
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',

})

app.listen(PORT, function() {
    console.log("Server is running on Port:", PORT);
});
