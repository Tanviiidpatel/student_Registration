const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// MongoDB Atlas Connection URL
const uri = "mongodb+srv://21dit065:d7pSHirv2qMZuS37@tanvi.i4xddoy.mongodb.net/student_data?retryWrites=true&w=majority&appName=Tanvi";

// Connect to MongoDB Atlas
mongoose.connect(uri, {  // Updated from mongoURI to uri
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define Mongoose Schema and Model
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  semester: { type: String, required: true },
  stream: { type: String, required: true },
  futureGoal: { type: String, required: true }
});

const Registration = mongoose.model('Registration', registrationSchema);

// API Endpoint to Handle Form Submission
app.post('/register', async (req, res) => {
  try {
    const existingUser = await Registration.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone number already exists' });
    }

    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
