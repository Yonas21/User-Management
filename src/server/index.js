const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

let userRouter = require("./routes/user.router");
let productRouter = require("./routes/products.router");
let orderRouter = require("./routes/orders.router");
let wish_listRouter = require("./routes/wishlist.router");
let cartRouter = require('./routes/cart.router');
const reviewRouter = require('./routes/review.router');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(
    () => {
        console.log("Database is connected");
    },
    err => {
        console.log("Can not connect to the database" + err);
    }
);

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

app.listen(PORT, function() {
    console.log("Server is running on Port:", PORT);
});
