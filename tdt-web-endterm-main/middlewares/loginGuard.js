module.exports.loginGuardMiddleware = function (req, res, next) {

    if (req.isAuthenticated() || req.session.user) {
        return res.redirect("/");
    } else {
        next();
    }
}