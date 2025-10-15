const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credential :true
}));


app.use("/api/auth", authRouter);
app.use("/api/auth", userRouter);


module.exports = app;