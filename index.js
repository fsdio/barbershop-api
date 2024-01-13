// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
const user = "klikrahmatsunjani";
const pass = "t9sfrrGuXAydEstA";
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(`mongodb+srv://${user}:${pass}@barbershop-api.t4etbee.mongodb.net/barbershop?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Load Routes
import routes from './routes/index.js';
app.use('/api', routes);

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
