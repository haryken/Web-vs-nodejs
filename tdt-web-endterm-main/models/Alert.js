const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alertSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    section: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Section"
    },
    createdAt: Date,
})

alertSchema.statics.getAllAlerts = async function (
    page
) {
    try {

        let alerts = await this.find({})
            .populate("user")
            .populate("section")
            .exec();

        alerts.sort((firstAlert, secondAlert) => {
            let firstAlertTime = new Date(firstAlert.createdAt).getTime();
            let secondAlertTime = new Date(secondAlert.createdAt).getTime();

            return secondAlertTime - firstAlertTime;
        })

        page = Number.parseInt(page);

        if (!page) {
            page = 0;
        }

        alerts = alerts.slice(page * 10, (page + 1) * 10);

        return alerts;
        
    } catch (error) {
        throw error;
    }
}

alertSchema.statics.getAlertDetail = async function (
    id
) {
    try {

        let alert = await this.findOne({
            _id: id
        })
        .populate("user")
        .populate("section")
        .exec();

        return alert;
        
    } catch (error) {
        throw error;
    }
}

alertSchema.statics.getAlertsBySection = async function (
    sectionId
) {
    try {

        let alerts = await this.find({
            section: sectionId
        })
            .populate("user")
            .populate("section")
            .exec();

        return alerts;

    } catch (error) {
        throw error;
    }
}

alertSchema.statics.createAlert = async function (
    content,
    user,
    section,
    createdAt
) {
    try {

        let alert = await this.create({
            content,
            user,
            section,
            createdAt
        });

        alert = await alert.populate("section").execPopulate();

        return alert;
        
    } catch (error) {
        throw error;
    }
}

alertSchema.statics.updateAlert = async function (
    sectionId,
    content,
    section,
) {
    try {

        let alert = await this.findOne({
            _id: sectionId
        }).exec();

        if (alert) {

            if (content) {
                alert.content = content;
            }

            if (section) {
                alert.section = section;
            }

            await alert.save();

            return alert;

        } else {
            throw new Error("Alert doesn't exist")
        }

    } catch (error) {
        throw error;
    }
}

alertSchema.statics.deleteAlert = async function (
    id
) {
    try {

        let result = await this.deleteOne({
            _id: id
        })

        if (result.deletedCount > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        throw error;
    }
}

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;