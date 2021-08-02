const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentUserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "Section"
        }
    ]
})

departmentUserSchema.statics.getUserDetail = async function (
    userId,
) {
    try {

        let departmentUser = await this.findOne({
            user: userId
        }).populate("sections").exec();

        return departmentUser;

    } catch (error) {
        throw error;
    }
}

departmentUserSchema.statics.updateUserDetail = async function(
    sections,
    userId,
) {
    try {

        let departmentUser = await this.findOne({
            user: userId
        }).exec();

        if (!departmentUser) {
            departmentUser = await this.create({
                user: userId,
                sections
            })
        } else {
            departmentUser.sections = sections;
    
            await departmentUser.save();
        }


        return departmentUser;

    } catch (error) {
        throw error;
    }
}

const DepartmentUser = mongoose.model("DepartmentUser", departmentUserSchema);

module.exports = DepartmentUser;