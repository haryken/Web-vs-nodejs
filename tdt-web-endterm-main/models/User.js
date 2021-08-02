const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SALT_ROUND = 10;

const userSchema = new Schema({
    googleId: {
        type: String,
    },
    displayName: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: [
            "STUDENT",
            "ADMIN",
            "DEPARTMENT"
        ]
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    className: String,
    departmentName: String
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, SALT_ROUND);
    }

    next();
})

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error("Invalid login credential")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid login credential")
    }

    return user;
}

userSchema.statics.createUserByLoginWithGoogle = async function (
    googleId,
    displayName,
    image,
    role,
) {
    try {

        const user = await this.create({
            googleId,
            displayName,
            image,
            role
        })

        return user;

    } catch (error) {
        throw error;
    }
}

userSchema.statics.createUser = async function (
    displayName,
    role,
    username,
    password,
) {
    try {

        const oldUser = await this.findOne({
            username
        }).exec();

        if (oldUser) {
            throw new Error("There already exist an user with this username");
        }


        const user = await this.create({
            displayName,
            role,
            username,
            password
        });

        return user;

    } catch (error) {
        throw error;
    }
}

userSchema.statics.getUserDetail = async function (
    id,
) {
    try {

        let user;

        user = await this.findOne({
            _id: id
        })

        return user;

    } catch (error) {
        throw error;
    }
}

userSchema.statics.updateUser = async function(
    id,
    displayName,
    image,
    newPassword,
    oldPassword,
    className,
    departmentName
) {
    try {
        
        let currentUser = await this.findOne({
            _id: id 
        }).exec();

        if (currentUser) {

            if (displayName) {
                currentUser.displayName = displayName;
            }

            if (image) {
                currentUser.image = image;
            }

            if (newPassword && oldPassword) {

                const isPasswordMatch = await bcrypt.compare(oldPassword, currentUser.password);

                if (!isPasswordMatch) {
                    throw new Error("Old password is incorrect!");
                }

                currentUser.password = newPassword;
            }

            if (className) {
                currentUser.className = className;
            }

            if (departmentName) {
                currentUser.departmentName = departmentName;
            }

            await currentUser.save();

            return currentUser;

        } else {
            throw new Error("User doesn't eixst!")
        }
        
    } catch (error) {
        throw error;
    }
}

userSchema.statics.getUsers = async function (role) {
    try {

        console.log(role);

        let users = await User.find({ role }).exec();

        return users;

    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;