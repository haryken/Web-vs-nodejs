const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

sectionSchema.statics.createSection = async function (
    name
) {
    try {

        const section = await this.create({
            name
        })

        return section;

    } catch (error) {
        throw error;
    }
}

sectionSchema.statics.getSections = async function() {
    try {

        let sections = await this.find({}).exec();

        return sections;

    } catch (error) {
        throw error;
    }
}

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;