import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // To handle loading state
  const navigate = useNavigate();  // For navigation after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    setLoading(true);  // Set loading state to true when API call starts

    try {
      const response = await fetch('http://localhost:9000/api/auth/login', {  // Make sure the API endpoint is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Save the token (or user data) to localStorage or context
        localStorage.setItem('token', data.token);  // Store the JWT token

        // Navigate to the user profile or home page after successful login
        navigate('/profile');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);  // Set loading state to false after the API call is completed
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
