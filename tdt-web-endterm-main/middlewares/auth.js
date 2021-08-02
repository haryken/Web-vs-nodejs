module.exports.authMiddleware = (req, res, next) => {
    if (req.isAuthenticated() || req.session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
}