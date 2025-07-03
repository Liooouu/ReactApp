import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// User model
import User from './models/user.js';

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Add this test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// POST login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  console.log(`Login attempt: ${username} / ${password}`);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Temporary route to insert a test user
app.get('/add-test-user', async (req, res) => {
  try {
    const user = new User({ username: 'admin', password: '1234' });
    await user.save();
    res.send('Test user created!');
  } catch (err) {
    res.status(500).send('Error creating user');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
