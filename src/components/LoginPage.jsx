import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../index.css"
import "./LoginPage.css"

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/login', {
        email,
        password,
        role
      });

      // Assuming the backend returns a token upon successful login
      const token = response.data.token;

      // You can save the token to localStorage or a state management solution like Redux
      localStorage.setItem('token', token);

      // Redirect the user to the dashboard or any other authenticated route
      // For example, you can use React Router to navigate programmatically
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response.data);
      setError('Failed to login');
    }
  };

  return (
    <div className="auth-container col-md-6 mx-auto container mt-5 mb-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select className="form-select" id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="Tourist">Tourist</option>
            <option value="tourGuide">Tour Guide</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="text-center mt-3">
          <p>
            Forgot your password? <Link to="/forgot-password">Reset it here</Link> {/* Link to the forgot password page */}
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
