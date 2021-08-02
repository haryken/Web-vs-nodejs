const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        return conn.connection.getClient();

    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;

