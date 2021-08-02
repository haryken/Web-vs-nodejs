const {
    body,
    validationResult
} = require("express-validator");

const Section = require("../models/Section");

module.exports.createSection = [
    body("name").isLength({ min: 1}).withMessage("Section name must be specified"),
    async (req, res, next) => {
        try {

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array()
                })
            }

            let {
                name
            } = req.body;

            const section = await Section.createSection(
                name,
            )

            return res.status(201).json(section);

        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
]