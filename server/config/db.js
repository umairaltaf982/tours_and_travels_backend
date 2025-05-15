const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        // Check if MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI environment variable is not defined');
            console.log('Please add MONGO_URI to your .env file');
            process.exit(1);
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDB;