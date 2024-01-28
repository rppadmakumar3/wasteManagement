const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3030', // Replace with your frontend's origin
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/WasteManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const industrySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Industry = mongoose.model('Industry', industrySchema);

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);

    const { email, username, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    console.log('Checking existing email:', email);
    const existingEmailIndustry = await Industry.findOne({ email });
    if (existingEmailIndustry) {
      console.log('Email already exists:', email);
      return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
    }

    // Check if the username already exists
    console.log('Checking existing username:', username);
    const existingUsernameIndustry = await Industry.findOne({ username });
    if (existingUsernameIndustry) {
      console.log('Username already exists:', username);
      return res.status(409).json({ error: 'Username already exists. Please choose a different username.' });
    }

    const newIndustry = new Industry({
      email,
      username,
      password: hashedPassword,
    });

    await newIndustry.save();

    console.log('Industry successfully registered:', newIndustry);
    return res.status(201).json({ message: 'Industry successfully registered.' });
  } catch (error) {
    console.error('Signup error:', error);

    if (error.code === 11000) {
      console.log('Duplicate key error:', error);
      return res.status(409).json({ error: 'Duplicate key error. Please check your input.' });
    }

    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);

    const { email, password } = req.body;

    // Find the industry by email
    console.log('Finding industry by email:', email);
    const industry = await Industry.findOne({ email });

    if (!industry) {
      console.log('Industry not found:', email);
      return res.status(404).json({ error: 'Industry not found. Please check your email.' });
    }

    // Compare the provided password with the hashed password in the database
    console.log('Comparing passwords:', password, industry.password);
    const passwordMatch = await bcrypt.compare(password, industry.password);

    if (!passwordMatch) {
      console.log('Incorrect password:', password);
      return res.status(401).json({ error: 'Incorrect password. Please check your password.' });
    }

    // You can include additional logic here, such as creating and sending a JWT token for authentication

    console.log('Login successful.');
    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);

    if (error.name === 'ValidationError') {
      console.log('Validation error:', error);
      return res.status(400).json({ error: 'Validation error. Please check your input.' });
    }

    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});