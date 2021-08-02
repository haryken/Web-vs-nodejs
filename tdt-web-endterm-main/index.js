require("dotenv").config()

const express = require("express");
const http = require("http");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const flash = require("express-flash");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const sectionRouter = require("./routes/section");
const departmentRouter = require("./routes/department");
const adminRouter = require("./routes/admin");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const alertRouter = require("./routes/alert");

require("./config/passport")(passport);

const client = require("./db/db")();

const app = express();

const server = http.createServer(app);

app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //     clientPromise: client,
    //     dbName: "ProjectWebCK",
    // }),
    unset: "destroy"
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/sections", sectionRouter);
app.use("/departments", departmentRouter);
app.use("/admins", adminRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/alerts", alertRouter);

const PORT = process.env.PORT || 3000;

const socketio = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})

server.listen(PORT, () => {
    console.log(`Process is running on port ${PORT}`);
})