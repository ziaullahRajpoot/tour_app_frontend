import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/SignupPage.css';

import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import { SERVER_URL } from '../constants';


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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/auth/signup`, {
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
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to sign up');
      }
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
  
    <div className="auth-container col-sm-12 col-xl-6">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="First Name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Last Name *" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <PhoneInput 
              country={'us'}
              value={phone}
              onChange={(value) => setPhone(value)}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              }}
            />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role <label className='staric'>*</label></option>
              <option value="tourist">Tourist</option>
              <option value="tour-guide">Tour Guide</option>
            </select>
          </div>
          <div className="form-group">
            <div className="password-input-container">
              <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password *" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-group check">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
            
            <span style={{ marginLeft: '10px' }}>
             
              <Link to="/login"> Log in here</Link>
            </span>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
    
  
    
  );
}

export default SignupPage;
