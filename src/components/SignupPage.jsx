import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        phone,
        role
      });

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response.data);
      setError('Failed to sign up');
    }
  };

  const validateForm = () => {
    let formIsValid = true;

    // First Name
    if (!firstName) {
      setError('*Please enter your first name.');
      formIsValid = false;
    }

    // Last Name
    if (!lastName) {
      setError('*Please enter your last name.');
      formIsValid = false;
    }

    // Phone Number
    if (!phone) {
      setError('*Please enter your phone number.');
      formIsValid = false;
    }

    // Email
    if (!email) {
      setError('*Please enter your email.');
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('*Please enter a valid email.');
      formIsValid = false;
    }

    // Password
    if (!password) {
      setError('*Please enter your password.');
      formIsValid = false;
    } else if (password.length < 8) {
      setError('*Password must be at least 8 characters.');
      formIsValid = false;
    }

    // Role
    if (!role) {
      setError('*Please select a role.');
      formIsValid = false;
    }

    return formIsValid;
  };

  return (
    <div className="auth-container col-md-6 mx-auto">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phoneNumber" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="Tourist">Tourist</option>
            <option value="tourGuide">Tour Guide</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
