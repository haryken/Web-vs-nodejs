const express = require("express");

const indexController = require("../controllers/indexController");

const { authMiddleware } = require("../middlewares/auth");
const { loginGuardMiddleware } = require("../middlewares/loginGuard");

const router = express.Router();

router.get("/", authMiddleware, indexController.renderHome)

router.get("/login", loginGuardMiddleware, indexController.renderLogin)

router.post("/login", indexController.authenticateUser)

router.get("/logout", (req, res) => {
    req.logout();

    req.session = null;

    res.redirect("/login");
})

module.exports = router;