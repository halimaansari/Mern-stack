import 'dotenv/config';
import mongoose from 'mongoose';

const url = process.env.MONGODB_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      dbName: 'first-e-commerce',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Optional: to exit if db connection fails
  }
};

export default connectToDB;
