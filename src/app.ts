require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';

import connectDB from './utils/connectDB';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route';
import trackRouter from './routes/track.route';
import playlistRouter from './routes/playlist.route';

const app = express();

// Instantiate Middleware

// Body Parser
app.use(express.json({ limit: '10kb' }));

//Cookie Parser
app.use(cookieParser());

// Logger
if (process.env.NODE_ENV === 'development') 
    app.use(morgan('dev'));

// cors instantiation
app.use(
    cors({
        origin: config.get<string>('origin'),
        credentials: true,
    })
);

// Routes Instantiation
app.use('/api/auth', authRouter);

app.use('/api/track', trackRouter);
app.use('/api/playlist', playlistRouter);


// Testing Initializations
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: 'success',
        messsage: 'Welcome to Simfy Africa - Music API',
    });
});

// Unknowm Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        messsage: err.message,
    });
});

const port = config.get<number>('port');

app.listen(port, () => {
    console.log(`Simfy Africa - Music API Server started on port: ${port}`);

    connectDB();
});