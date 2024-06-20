const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Classroom Web App!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});