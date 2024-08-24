require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  semester: { type: String, required: true },
  stream: { type: String, required: true },
  futureGoal: { type: String, required: true }
});

const Registration = mongoose.model('Registration', registrationSchema);

app.post('/register', async (req, res) => {
  console.log('Received registration data:', req.body);

  try {
    
    const { name, email, phone, semester, stream, futureGoal } = req.body;
    if (!name || !email || !phone || !semester || !stream || !futureGoal) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await Registration.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone number already exists' });
    }

    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
