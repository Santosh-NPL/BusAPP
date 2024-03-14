import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));

// Set up body parsers with limit from environment variable
const limit = process.env.LIMIT || '16kb'; // Default to 16KB if LIMIT is not set
app.use(express.json({ limit }));
app.use(express.urlencoded({ extended: true, limit }));

app.use(express.static("public"));

app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import samitiRouter from './routes/samiti.routes.js';

// Route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/samiti", samitiRouter);

export { app };
