const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Direct MongoDB connection
mongoose.connect("mongodb+srv://satyanarayanamurthyborra_db_user:b5Mn5V0moQhOuTqE@cluster0.gaijagy.mongodb.net/travelplanner?retryWrites=true&w=majority")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));

app.get('/', (req, res) => {
  res.send('AI Travel Planner API Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});