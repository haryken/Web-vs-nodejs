const e = require("express");
const {
    body,
    validationResult
} = require("express-validator");
const Alert = require("../models/Alert");
const DepartmentUser = require("../models/DepartmentUser");
const Post = require("../models/Post");

const User = require("../models/User");

module.exports.authenticateUser = [
    body("user").isLength({ min: 1}).escape().withMessage("User must be specified"),
    body("pass").isLength({ min: 1}).escape().withMessage("Password must be specified"),
    async (req, res, next) => {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {

                req.flash("error", errors.array()[0].msg);
                return res.redirect("/login");
            }

            let {
                user,
                pass
            } = req.body;

            let correctUser = await User.findByCredentials(user, pass);

            if (correctUser) {
                req.session.user = correctUser;
                
                res.redirect("/");

            }


        } catch (error) {
            req.flash("error", "Invalid login credential");
            return res.redirect("/login");
        }
    }
]

module.exports.renderHome = async (req, res) => {

    let user = req.session.user;

    let posts = await Post.getAllPosts();
    
    let alerts = await Alert.getAllAlerts();

    let departmentUser = await DepartmentUser.getUserDetail(user._id);

    console.log(posts.length);

    return res.render("home", {
        user,
        posts,
        alerts,
        departmentUser
    });
}

module.exports.renderLogin = (req, res) => {

    let errorMessage = req.flash("error");

    return res.render("login", {
        errorMessage
    });
}