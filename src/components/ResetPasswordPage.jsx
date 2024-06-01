import React, { useState } from 'react';
import "../style/ResetPasswordPage.css"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send a request to your backend to reset the password using the token
      // For now, we'll just log the password to the console
      console.log('New Password:', password);
      // You can replace the above console.log with your actual password reset logic

      // Reset the form fields
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password');
    }
  };

  return (
    <div className='reset-password-container'>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input 
            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <div>
          <input className='checkbox'
            type="checkbox" 
            id="showPassword" 
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
          <label className='checkbox' htmlFor="showPassword">Show Password</label>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
