import express from 'express';
import mockRoutes from './src/routes/mock.router.js'
import { connectDB } from './db.js'
import {__dirname} from './utils.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mocks', mockRoutes)

const httpServer = app.listen(PORT, () => console.log('Servidor listo en el puerto '+ PORT));
connectDB();