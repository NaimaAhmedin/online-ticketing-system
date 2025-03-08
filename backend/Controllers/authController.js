import User, { findOne } from '../models/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Signup function
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email, // Ensure email is included here
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser._id, username, email } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body; // Use email instead of username
  try {
    const user = await findOne({ email }); // Find user by email
    if (!user || !(await compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Export the functions
export default { signup, login };