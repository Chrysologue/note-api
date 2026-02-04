const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successully connected to MongoDB Atlas');
  } catch (e) {
    console.log('Failed to connect to MongoDB Atlas', e.message);
  }
}

module.exports = { connectToDb };
