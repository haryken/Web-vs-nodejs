const {
    body,
    validationResult
} = require("express-validator");
const DepartmentUser = require("../models/DepartmentUser");
const User = require("../models/User");
const Section = require("../models/Section");
const multerConfig = require("../config/multer");
const multer = require("multer");

const upload = multer({
    storage: multerConfig.storage
});

module.exports.createUser = [
    body("displayName").isLength({ min: 1}).withMessage("Display name must be specified"),
    body("username").isLength({ min: 1}).withMessage("Username must be specified"),
    body("password").isLength({ min: 1}).withMessage("Password must be specified"),
    body("rePassword").isLength({ min: 1}).withMessage("Confirm password must be specified")
        .custom((value, {req}) => {
            if (value === req.body.password) {
                return true;
            } else {
                throw new Error("Password and confirmation password doesn't match");
            }
        }),
    async (req, res, next) => {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array()
                })
            }

            let {
                displayName,
                username,
                password 
            } = req.body;

            let user = await User.createUser(
                displayName,
                "DEPARTMENT",
                username,
                password,
            );

            return res.status(201).json(user);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
]

module.exports.updateUser = [
    upload.single("profilePicture"),
    async (req, res, next) => {
        try {

            let {
                displayName,
                image,
                newPassword,
                oldPassword,
                className,
                departmentName
            } = req.body;

            if (req.file) {
                image = req.file.path.slice(6);
            }

            let user = await User.updateUser(
                req.session.user._id,
                displayName,
                image,
                newPassword,
                oldPassword,
                className,
                departmentName
            );

            return res.json(user);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
}]

module.exports.renderUserUpdate = async (req, res, next) => {
    try {

        let user = await User.getUserDetail(
            req.session.user._id
        );

        return res.render("user-update", {
            user
        });

    } catch (error) {
        return res.status(400).json({
            error: "Error happened during user information update"
        })
    }
}

module.exports.renderUserCreate = async (req, res, next) => {
    try {

        let user = await User.getUserDetail(
            req.session.user._id
        );

        return res.render("user-create", {
            user
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.renderUserAssign = async (req, res, next) => {
    try {

        let user = await User.getUserDetail(
            req.session.user._id
        );

        let users = await User.getUsers("DEPARTMENT");
        let sections = await Section.getSections();

        return res.render("user-assign", {
            user,
            users,
            sections
        });
        
    } catch (error) {

    }
}

module.exports.assignUser = [
    body("user").isLength({min: 1}).withMessage("User must be specified"),
    body("sections").exists().withMessage("Sections must be specified")
        .custom((value, {req}) => {
            if (Array.isArray(value)) {
                return true;
            }
            throw new Error("Sections must be an array of Section");
        }),
    async (req, res, next) => {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array()[0].msg
                })
            }

            let {
                user,
                sections 
            } = req.body;

            let departmentUser = await DepartmentUser.updateUserDetail(
                sections,
                user,
            );

            return res.json(departmentUser);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
]

module.exports.getUserSections = [
    body("user").isLength({min: 1}).withMessage("User must be specified"),
    async (req, res, next) => {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array()[0].msg
                })
            }

            let {
                user,
            } = req.body;

            let departmentUser = await DepartmentUser.getUserDetail(user);
            
            return res.status(200).json({
                departmentUser,
            });

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
]

