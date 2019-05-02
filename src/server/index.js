const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const config = require("./DB");

let userRouter = require("./routes/user.route");
let productRouter = require("./routes/products");
let orderRouter = require("./routes/orders");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {
        console.log("Database is connected");
    },
    err => {
        console.log("Can not connect to the database" + err);
    }
);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port:", PORT);
});
