const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://satyanarayanamurthyborra_db_user:b5Mn5V0moQhOuTqE@cluster0.gaijagy.mongodb.net/travelplanner?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;