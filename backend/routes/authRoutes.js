import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/authController.js'; // Import controller functions

const router = express.Router();

// POST route for user registration
router.post('/register', registerUser);

// POST route for user login
router.post('/login', loginUser);

// get route for user
router.get('/user', getUser);

export default router; // Export the router to be used in app.mjs
