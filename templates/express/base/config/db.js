const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        const dbName = process.env.DB_NAME;
        await mongoose.connect(mongoUri, { dbName });
        console.log(`MongoDB Connected: Database Name - ${dbName}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
