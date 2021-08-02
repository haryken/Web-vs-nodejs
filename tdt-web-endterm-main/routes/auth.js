const express = require("express");
const passport = require("passport");

const router = express.Router();


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
}), (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
}, (err, req, res, next) => {

    req.flash("error", "Email domain must be @student.tdtu.edu.vn")

    return res.redirect("/login");
})



module.exports = router;