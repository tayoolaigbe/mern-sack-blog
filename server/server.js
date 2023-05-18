import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import {
	errorResponserHandler,
	invalidPathHandler,
} from './middleware/errorHandler';

// routes
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server is running....');
});

app.use('/api/users', userRoutes);

// static assets

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
