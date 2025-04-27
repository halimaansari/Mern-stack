import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './db/db.js'; // Database connection
import authRoutes from './routes/authRoutes.js'; // Auth routes
import taskRoutes from './routes/taskRoutes.js'; // Task routes

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

const PORT = process.env.PORT || 9000;

// Connect to MongoDB
connectToDB();

// Use routes
app.use('/api/auth', authRoutes); // Auth routes (register and login)
app.use('/api/tasks', taskRoutes); // Task routes (create, update, delete, fetch)

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
