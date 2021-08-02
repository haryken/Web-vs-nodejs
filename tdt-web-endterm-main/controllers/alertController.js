const Alert = require("../models/Alert")
const Section = require("../models/Section");

const mongoose = require("mongoose");

const {
    body,
    validationResult
} = require("express-validator");
const { json } = require("express");

module.exports.getAllAlerts = async (req, res, next) => {
    try {

        let {
            page 
        } = req.query;

        let alerts = await Alert.getAllAlerts(page);

        return res.status(200).json(alerts);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.getAlertDetail = async (req, res, next) => {
    try {

        let {
            id
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Alert ObjectID must be valid"
            })
        }

        let alert = await Alert.getAlertDetail(id);

        return res.status(200).json(alert);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.renderAlertsBySection = async (req, res, next) => {
    try {

        let {
            sectionId
        } = req.params;

        if (!mongoose.isValidObjectId(sectionId)) {
            return res.status(400).json({
                error: "Section ObjectID must be valid"
            })
        }

        let user = req.session.user;

        let alerts = await Alert.getAlertsBySection(sectionId);

        return res.render("alert-section", {
            user,
            alerts
        })

    } catch (error) {
        // return res.redirect("/alerts/sections");
        console.log(error);
    }
}

module.exports.createAlert = [
    body("content").isLength({min: 1}).withMessage("Alert content must be specified"),
    body("section").isLength({min: 1}).withMessage("Section must be specified")
        .custom((value, {req}) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Section must be an valid ObjectID");
            }
            return true;
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
                content,
                section
            } = req.body;

            let alert = await Alert.createAlert(
                content,
                req.session.user._id,
                section,
                new Date()
            );

            return res.status(201).json(alert);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
]

module.exports.updateAlert = async (req, res, next) => {
    try {

        let {
            id
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Alert ObjectID must be valid"
            })
        }

        let {
            content,
            section
        } = req.body;

        let alert = await Alert.updateAlert(
            id,
            content,
            section
        );

        return res.json(alert);
        
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.deleteAlert = async (req, res, next) => {
    try {

        let {
            id
        } = req.params;
        
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Alert ObjectID must be valid"
            })
        }

        let result = await Alert.deleteAlert(id);

        if (result) {
            return res.json({
                id
            })
        } else {
            throw new Error("No alert was deleted")
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.renderAlerts = async (req, res, next) => {
    let user = req.session.user;

    let alerts = await Alert.getAllAlerts();

    return res.render("alert-all", {
        user,
        alerts
    })
}

module.exports.renderAlertDetail = async (req, res, next) => {

    try {
        let user = req.session.user;

        let alert = await Alert.getAlertDetail(req.params.id);

        return res.render("alert-detail", {
            user,
            alert 
        })

    } catch (error) {
        return res.redirect("/alerts")
    }

    
}

module.exports.renderAlertSections = async (req, res, next) => {
    try {

        // let {
        //     sectionId
        // } = req.params;

        // if (!mongoose.isValidObjectId(id)) {
        //     throw new Error("Invalid")
        // }

        let user = req.session.user;

        let sections = await Section.getSections();

        return res.render("alert-sections", {
            sections,
            user,
        })

    } catch (error) {
        return res.redirect("/alerts");
    }
}