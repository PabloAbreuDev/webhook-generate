import express from 'express';
import { router } from './routes';
import dotenv from 'dotenv'

// Configuracao do dotenv
dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? '.env.test' : '.env',
});

const app = express();
app.use(express.json())
app.use(router)

export { app }