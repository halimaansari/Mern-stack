import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./component/Auth/Login.jsx";
import Register from './component/Auth/Register';
import TaskBoard from './component/Dashboard/TaskBoard';
import Profile from './component/Profile/ProfilePage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<TaskBoard />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Home Page Route */}
          <Route 
            path="/" 
            element={
              <div className="home-page">
                <div className="home-content">
                  <h1>Welcome to Task Tracker</h1>
                  <p>Manage your tasks efficiently and stay organized!</p>
                  <div className="button-container">
                    <Link to="/login">
                      <button className="btn">Login</button>
                    </Link>
                    <Link to="/register">
                      <button className="btn">Sign Up</button>
                    </Link>
                  </div>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
