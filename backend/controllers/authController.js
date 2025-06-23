const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP Controller
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('📩 Signup Request:', { name, email });

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      points: 0
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'User created successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        donations: 0,
        points: user.points,
        token
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// LOGIN Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login Request:', { email });

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password match?', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        donations: 0, // optional: replace with actual count if needed
        points: user.points || 0,
        token
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

module.exports = { signupUser, loginUser };
