const User = require('../models/user');
const bcrypt = require('bcrypt'); // Library for password hashing
const jwt = require('jsonwebtoken'); // Library for generating tokens

// Function to register a new user
exports.register = async (req, res) => {
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to login a user
exports.login = async (req, res) => {
  // Find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  // Compare hashed passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

  // Generate and send JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.send({ user, token });
};

// ... Add other authentication functions like password reset (optional)
