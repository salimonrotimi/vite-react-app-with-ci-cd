require('dotenv').config();

const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (result) {
      console.log('MongoDB connection successful.');
    } else {
      console.log('MongoDB connection failed');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB. ' + error);
  }
};

module.exports = dbConnect;
