import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todoRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/tasks', todoRouter);
app.use('/user', userRouter);

// Error-handling middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({ error: error.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));