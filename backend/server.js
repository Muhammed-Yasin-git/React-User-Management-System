import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './Middleware/errorMiddleware.js';
import userRouter from './Router/userRouter.js';
import adminRouter from './Router/adminRouter.js';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 8080;
connectDB();
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

app.use('/api/users', userRouter);
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=> res.send('Server is Ready'))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
 