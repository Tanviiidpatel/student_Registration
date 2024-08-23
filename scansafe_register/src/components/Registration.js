import React, { useState } from 'react';
import './Registration.css'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    semester: '',
    stream: '',
    futureGoal: ''
  });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('student-registration-back.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          semester: '',
          stream: '',
          futureGoal: ''
        });
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name"
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label htmlFor="email">Email ID:</label>
        <input 
          type="email" 
          id="email"
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input 
          type="tel" 
          id="phone"
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label htmlFor="semester">Semester:</label>
        <input 
          type="text" 
          id="semester"
          name="semester" 
          value={formData.semester} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label htmlFor="stream">Stream:</label>
        <select 
          id="stream"
          name="stream" 
          value={formData.stream} 
          onChange={handleChange} 
          required
        >
          <option value="" disabled>Select your stream</option>
          <option value="Electrical">Electrical</option>
          <option value="IT">IT</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="futureGoal">Future Goal:</label>
        <select 
          id="futureGoal"
          name="futureGoal" 
          value={formData.futureGoal} 
          onChange={handleChange} 
          required
        >
          <option value="" disabled>Select your future goal</option>
          <option value="Job">Job</option>
          <option value="Business">Business</option>
          <option value="Higher Studies">Higher Studies</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
