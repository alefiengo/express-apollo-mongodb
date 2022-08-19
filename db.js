const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/tasks');
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { connectDB };
