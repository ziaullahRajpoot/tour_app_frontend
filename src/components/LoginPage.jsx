import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../index.css";
import "../style/LoginPage.css";
import { SERVER_URL } from '../constants';

function LoginPage({ setIsLoggedIn }) { // Accept the prop to update the login state
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        email,
        password,
        role,
      });

      const { status, body } = response.data;
      if (status) {

        console.log('Hrllll');

        // Save user data and tour guide ID in localStorage upon successful login
        localStorage.setItem('userData', JSON.stringify(body));
        localStorage.setItem('userId', body.id); // Assuming user ID is available in login response
        localStorage.setItem('tourGuideId', body.tourGuideId); // Assuming tour guide ID is available in login response
        const token = body.token;
        localStorage.setItem('token', token);
        navigate('/');
      }else {
        setError('An error occurred. Please try again.');
      }
     } catch (error) {
      console.log('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container col-md-6 mx-auto mt-5 mb-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label visually-hidden">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label visually-hidden">Role</label>
          <div className="form-group">
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select Role *</option>
              <option value="tourist">Tourist</option>
              <option value="tour-guide">Tour Guide</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label visually-hidden">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPassword"
            checked={showPassword}
            onChange={handlePasswordVisibility}
          />
          <label className="form-check-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/signup">Back to Signup Page</Link>
          </p>
          <p>
            Forgot your password? <Link to="/forgot-password">Reset it here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
